<template>
  <bubble-menu
    class="bubbleMenu"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
    v-if="editor"
  >
    <v-btn
      @click="editor.chain().focus().toggleBold().run()"
      retain-focus-on-click
      :class="{ 'is-active': editor.isActive('bold') }"
      dark
      tile
      shaped
      height="40px"
    >
      <v-icon>mdi-format-bold</v-icon>
    </v-btn>

    <v-btn
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      retain-focus-on-click
      dark
      tile
      shaped
      height="40px"
    >
      <v-icon>mdi-format-italic</v-icon>
    </v-btn>

    <v-btn
      @click="editor.chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
      retain-focus-on-click
      dark
      tile
      shaped
      height="40px"
    >
      <v-icon>mdi-code-tags</v-icon>
    </v-btn>
  </bubble-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { BubbleMenu, Editor } from '@tiptap/vue-2';
interface Data {};
interface Methods {};
interface Computed {};

interface Props {
  editor: Editor
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    BubbleMenu
  },

  props: { 
    editor: { type: Editor, required: true }
  }
});
</script>

<style lang="scss">
.bubbleMenu {
  display: flex;
  border-radius: 4px;
  overflow: hidden;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.1rem;
    filter: brightness(.9);

    &:hover,
    &.is-active {
      filter: brightness(1.5);
      opacity: 1;
    }
  }
}
</style>
