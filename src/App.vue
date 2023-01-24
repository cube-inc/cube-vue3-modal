<template>
  <div class="container">
    <div class="content">
      <h1 class="title">{{ name }}</h1>
      <pre>v{{ version }}</pre>
      <fieldset class="form-group">
        <label class="form-label">
          <input type="checkbox" v-model="modalCloseButton" class="form-control" />
          <span class="form-text">Close button</span>
        </label>
      </fieldset>
      <fieldset class="form-group">
        <legend class="form-legend">Size</legend>
        <label class="form-label">
          <input type="radio" name="size" v-model="modalSize" value="" class="form-control" />
          <span class="form-text">Default</span>
        </label>
        <label class="form-label">
          <input type="radio" name="size" v-model="modalSize" value="modal-fullscreen" class="form-control" />
          <span class="form-text">Fullscreen</span>
        </label>
        <label class="form-label">
          <input type="radio" name="size" v-model="modalSize" value="modal-xs" class="form-control" />
          <span class="form-text">XS</span>
        </label>
        <label class="form-label">
          <input type="radio" name="size" v-model="modalSize" value="modal-sm" class="form-control" />
          <span class="form-text">SM</span>
        </label>
        <label class="form-label">
          <input type="radio" name="size" v-model="modalSize" value="modal-md" class="form-control" />
          <span class="form-text">MD</span>
        </label>
        <label class="form-label">
          <input type="radio" name="size" v-model="modalSize" value="modal-lg" class="form-control" />
          <span class="form-text">LG</span>
        </label>
        <label class="form-label">
          <input type="radio" name="size" v-model="modalSize" value="modal-xl" class="form-control" />
          <span class="form-text">XL</span>
        </label>
      </fieldset>
      <div class="button-list">
        <button class="button" @click="open">Open</button>
      </div>
      <Modal v-model="modal" :class="modalClass" :close-button="modalCloseButton">
        <div class="container">
          <div class="content">
            <h2>Test</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae architecto fugit mollitia fuga, et ex
              iusto eos quisquam eligendi officiis, quo corporis voluptatibus sit ad perspiciatis numquam soluta ducimus
              nisi?
            </p>
            <fieldset class="form-group">
              <label class="form-label">
                <input type="checkbox" v-model="modalCloseButton" class="form-control" />
                <span class="form-text">Close button</span>
              </label>
            </fieldset>
            <fieldset class="form-group">
              <legend class="form-legend">Size</legend>
              <label class="form-label">
                <input type="radio" name="modal-size" v-model="modalSize" value="" class="form-control" />
                <span class="form-text">Default</span>
              </label>
              <label class="form-label">
                <input
                  type="radio"
                  name="modal-size"
                  v-model="modalSize"
                  value="modal-fullscreen"
                  class="form-control"
                />
                <span class="form-text">Fullscreen</span>
              </label>
              <label class="form-label">
                <input type="radio" name="modal-size" v-model="modalSize" value="modal-xs" class="form-control" />
                <span class="form-text">XS</span>
              </label>
              <label class="form-label">
                <input type="radio" name="modal-size" v-model="modalSize" value="modal-sm" class="form-control" />
                <span class="form-text">SM</span>
              </label>
              <label class="form-label">
                <input type="radio" name="modal-size" v-model="modalSize" value="modal-md" class="form-control" />
                <span class="form-text">MD</span>
              </label>
              <label class="form-label">
                <input type="radio" name="modal-size" v-model="modalSize" value="modal-lg" class="form-control" />
                <span class="form-text">LG</span>
              </label>
              <label class="form-label">
                <input type="radio" name="size" v-model="modalSize" value="modal-xl" class="form-control" />
                <span class="form-text">XL</span>
              </label>
            </fieldset>
            <div class="button-list">
              <button class="button" @click="openOtherModal">Open another modal</button>
              <button class="button" @click="close">Close</button>
            </div>
          </div>
        </div>
        <Modal ref="otherModal">
          <div class="container">
            <div class="content">
              <h2>Another modal</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eaque ab officiis distinctio, assumenda
                iusto, sequi nemo repellat laborum asperiores delectus tempora quis veritatis maiores modi numquam
                maxime, est corrupti.
              </p>
            </div>
          </div>
        </Modal>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Modal from './components/Modal.vue'
import { name, version } from '../package.json'

const modal = ref(false)
const otherModal = ref<InstanceType<typeof Modal>>()
const modalCloseButton = ref(true)
const modalSize = ref('')

const modalClass = computed(() => {
  return modalSize.value
})

function open() {
  modal.value = true
}

function close() {
  modal.value = false
}

function openOtherModal() {
  otherModal.value?.open()
}
</script>

<style lang="scss">
@import './assets/scss/index';

// Text
$text-color: hsl(224, 34%, 10%);

// Types
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
$font-weight-base: normal;
$line-height-base: 1.5;
$font-size-base: 1em;

body {
  margin: 0;
  padding: 0;
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
  line-height: $line-height-base;
  color: $text-color;
  background-color: hsl(224, 34%, 98%);
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
.container {
  margin: 0 auto;
  max-width: $modal-breakpoint-md;
}
.content {
  padding: 1rem;
}
.section {
  margin: 3em 0;
}
.lead {
  font-size: 1.4em;
}
.title {
  margin: 0;
  font-size: 2.5em;
}
h1 {
  margin: 1em 0;
  font-size: 2.5em;
}
h2 {
  margin: 0.5em 0;
  font-size: 2em;
}
.form-group {
  border: 0 none;
  margin: 1rem 0;
}
.form-legend {
  font-weight: bold;
}
.form-label {
  display: block;
  cursor: pointer;
}
.form-control {
  + .form-text {
    margin-left: 0.25rem;
  }
  &[type='radio'] {
    + & {
      margin-left: 1rem;
    }
  }
}
.form-text {
}
.button-list {
  display: flex;
  gap: 0.25rem;
  margin: 1rem 0;
}
.button {
  cursor: pointer;
  margin: 0;
  padding: 0.75rem 1.5rem;
  border: 0 none;
  border-radius: 0.25rem;
  background-color: $text-color;
  color: white;
  font-size: inherit;
  text-transform: uppercase;
  @media (hover: hover) {
    &:hover {
      background-color: rgba($text-color, 0.9);
    }
  }
  &:active {
    background-color: rgba($text-color, 0.8);
  }
  &:disabled {
    opacity: 0.4;
  }
}
</style>
