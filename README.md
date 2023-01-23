# Cube Vue3 Modal

## Usage

With `v-model`:

```vue
<template>
  <div>
    <button @click="modal = true">Open</button>
    <Modal v-model="modal">
      <!-- The modal content here -->
    </Modal>
  </div>
</template>

<script setup lang="ts">
const modal = ref(false)
</script>
```

From `ref`:

```vue
<template>
  <div>
    <button @click="openModal">Open</button>
    <Modal ref="modal">
      <!-- The modal content here -->
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from 'cube-vue3-modal'
const modal = ref<InstanceType<typeof Modal>>()

async function openModal() {
  if (modal.value) {
    await modal.value.open()
    alert('The modal is now opened')
  }
}
</script>
```

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Environment variables

Create a `.env` file with the following variables:

```sh
VITE_PORT=8080
```
