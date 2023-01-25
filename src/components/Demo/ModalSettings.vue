<template>
  <form>
    <fieldset class="form-group">
      <label class="form-label">
        <input type="checkbox" v-model="closeButton" class="form-control" />
        <span class="form-text">Close button</span>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <legend class="form-legend">Size</legend>
      <label class="form-label">
        <input type="radio" name="size" v-model="size" value="" class="form-control" />
        <span class="form-text">Default</span>
      </label>
      <label class="form-label">
        <input type="radio" name="size" v-model="size" value="modal-fullscreen" class="form-control" />
        <span class="form-text">Fullscreen</span>
      </label>
      <label class="form-label">
        <input type="radio" name="size" v-model="size" value="modal-xs" class="form-control" />
        <span class="form-text">XS</span>
      </label>
      <label class="form-label">
        <input type="radio" name="size" v-model="size" value="modal-sm" class="form-control" />
        <span class="form-text">SM</span>
      </label>
      <label class="form-label">
        <input type="radio" name="size" v-model="size" value="modal-md" class="form-control" />
        <span class="form-text">MD</span>
      </label>
      <label class="form-label">
        <input type="radio" name="size" v-model="size" value="modal-lg" class="form-control" />
        <span class="form-text">LG</span>
      </label>
      <label class="form-label">
        <input type="radio" name="size" v-model="size" value="modal-xl" class="form-control" />
        <span class="form-text">XL</span>
      </label>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { computed, PropType, reactive } from 'vue'

const props = defineProps({
  modelValue: { type: Object as PropType<{ closeButton: boolean; size: string }>, required: true },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
}>()

const closeButton = computed({
  get() {
    return props.modelValue.closeButton
  },
  set(closeButton) {
    emit('update:modelValue', { ...props.modelValue, closeButton })
  },
})

const size = computed({
  get() {
    return props.modelValue.size
  },
  set(size) {
    emit('update:modelValue', { ...props.modelValue, size })
  },
})
</script>
