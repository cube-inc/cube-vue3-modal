<template>
  <Transition :name="transitionName" @after-enter="onModalAfterEnter" @after-leave="onModalAfterLeave">
    <div v-if="opened" ref="$modal" tabindex="-1" class="modal" v-bind="$attrs">
      <div class="modal-backdrop" ref="$backdrop" @click.self.stop="close"></div>
      <div
        ref="$dialog"
        class="modal-dialog"
        role="dialog"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="onDialogTransitionEnd"
      >
        <ButtonClose v-if="props.closeButton" :class="{ active: willClose }" @click="close" />
        <div ref="$container" class="modal-dialog-container">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {
  ComponentInternalInstance,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue'
import ButtonClose from './ModalButtonClose.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  closeButton: { type: Boolean, default: true },
  closeRatio: { type: Number, default: 1 / 5 },
  transitionName: { type: String, default: 'modal' },
  target: { type: [String, HTMLElement], default: () => document.body },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open', value: ComponentInternalInstance | null): void
  (e: 'opened', value: ComponentInternalInstance | null): void
  (e: 'close', value: ComponentInternalInstance | null): void
  (e: 'closed', value: ComponentInternalInstance | null): void
}>()

const $self = getCurrentInstance()
let $resolve = null as Function | null
let $lastFocus = null as Element | null
let $touchstartY = 0
let $touchmoveY = 0
let $isScrollAtTop = false
let $isScrollAtBottom = false
let $closeThreshold = 0
let $bodyOverflow = ''
const $targetElement =
  props.target instanceof HTMLElement ? props.target : document.querySelector(props.target) || document.body
const $transitionEnterActiveClassName = `${props.transitionName}-enter-active`
const $modal = ref<HTMLDivElement>()
// const $backdrop = ref<HTMLDivElement>()
const $dialog = ref<HTMLDivElement>()
const $container = ref<HTMLDivElement>()
const opened = ref(props.modelValue)
const willClose = ref(false)

watch(
  () => props.modelValue,
  (value) => {
    if (props.modelValue !== opened.value) value ? open() : close()
  }
)

function open(): Promise<void> {
  $lastFocus = document.activeElement
  return new Promise((resolve) => {
    $resolve = resolve
    lockScroll()
    opened.value = true
    nextTick(() => {
      if (opened.value !== true) emit('update:modelValue', true)
      emit('open', $self)
    })
  })
}

function close(): Promise<void> {
  return new Promise((resolve) => {
    $resolve = resolve
    opened.value = false
    unlockScroll()
    if (props.modelValue !== false) emit('update:modelValue', false)
    emit('close', $self)
  })
}

function toggle(): Promise<void> {
  return opened.value ? close() : open()
}

function scrollTo(options?: ScrollToOptions) {
  const container = $container.value
  if (container instanceof HTMLDivElement) container.scrollTo(options)
}

function onTouchStart(event: TouchEvent) {
  const { pageY } = event.touches[0]
  const modal = $modal.value
  const container = $container.value
  if (container && modal) {
    willClose.value = false
    $touchstartY = pageY
    $touchmoveY = pageY
    $isScrollAtTop = container.scrollTop === 0
    $isScrollAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
    $closeThreshold = window.innerHeight * props.closeRatio
    modal.classList.remove($transitionEnterActiveClassName)
  }
}

function onTouchMove(event: TouchEvent) {
  const { pageY } = event.touches[0]
  const container = $container.value
  const dialog = $dialog.value
  if (container && dialog) {
    $isScrollAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
    if ($isScrollAtTop || $isScrollAtBottom) {
      const offset = pageY - $touchstartY
      willClose.value = false
      // Handles progressive close
      if ($isScrollAtTop && offset >= 0) {
        event.preventDefault()
        dialog.style.transform = `translateY(${offset}px)`
        willClose.value = pageY >= $touchmoveY && offset >= $closeThreshold
      }
      // Handles bounce overscroll from bottom with 40% reduction
      if ($isScrollAtBottom && offset < 0) {
        event.preventDefault()
        dialog.style.transform = ''
        container.style.transform = `translateY(${offset * props.closeRatio}px)`
      }
      $touchmoveY = pageY
    } else {
      $isScrollAtTop = container.scrollTop === 0
      if ($isScrollAtTop || $isScrollAtBottom) {
        $touchstartY = pageY
        $touchmoveY = pageY
      }
    }
  }
}

function onTouchEnd(event: TouchEvent) {
  const modal = $modal.value
  const dialog = $dialog.value
  const container = $container.value
  if (modal && dialog && container) {
    if (willClose.value) {
      willClose.value = false
      close()
    } else {
      modal.classList.add($transitionEnterActiveClassName)
      dialog.style.transform = ''
      container.style.transform = ''
    }
  }
}

function onDialogTransitionEnd() {
  const modal = $modal.value
  modal?.classList.remove($transitionEnterActiveClassName)
}

function onModalAfterEnter() {
  emit('opened', $self)
  $resolve && $resolve()
}

function onModalAfterLeave() {
  if ($lastFocus instanceof HTMLElement) $lastFocus.focus()
  emit('closed', $self)
  $resolve && $resolve()
}

function lockScroll() {
  $bodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = $bodyOverflow
}

onMounted(() => {
  const $el = $self?.vnode.el as HTMLElement | undefined
  if ($el) $targetElement.appendChild($el)
})

onUnmounted(() => {
  const $el = $self?.vnode.el as HTMLElement | undefined
  if ($el) $targetElement.removeChild($el)
  if (opened.value) unlockScroll()
})

defineExpose({ open, close, toggle, scrollTo })
</script>
