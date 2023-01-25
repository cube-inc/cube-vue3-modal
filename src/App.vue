<template>
  <div class="container">
    <div class="content">
      <h1 class="title">{{ name }}</h1>
      <pre>v{{ version }}</pre>
      <DemoModalSettings v-model="modalSettings" />
      <div class="button-list">
        <button class="button" @click="open">Open</button>
      </div>
      <Modal v-model="modal" :class="modalSettings.size" :close-button="modalSettings.closeButton">
        <div class="container content">
          <h2>Test</h2>
          <DemoModalSettings v-model="modalSettings" />
          <div class="button-list">
            <button class="button" @click="openOtherModal">Open another modal</button>
            <button class="button" @click="close">Close</button>
          </div>
        </div>
        <Modal ref="otherModal" class="modal-xs">
          <div class="container content">
            <h2>Another modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eaque ab officiis distinctio, assumenda
              iusto, sequi nemo repellat laborum asperiores delectus tempora quis veritatis maiores modi numquam maxime,
              est corrupti.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore fuga laboriosam doloremque minus ex
              suscipit illo in consequatur rem necessitatibus, unde vel possimus molestias veritatis ducimus, alias
              molestiae sequi. Alias?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus velit voluptatum accusamus laudantium
              veritatis, obcaecati delectus nam exercitationem consequatur. Sunt nulla aliquid, corrupti nam cum
              accusamus repellendus quod illo velit?
            </p>
          </div>
        </Modal>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { name, version } from '../package.json'
import DemoModalSettings from './components/Demo/ModalSettings.vue'
import Modal from './components/Modal.vue'

const modal = ref(false)
const otherModal = ref<InstanceType<typeof Modal>>()

const modalSettings = ref({
  closeButton: true,
  size: '',
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
  &[type='checkbox'],
  &[type='radio'] {
    cursor: pointer;
  }
  + .form-text {
    margin-left: 0.25rem;
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
