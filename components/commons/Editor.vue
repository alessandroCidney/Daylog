<template>
  <v-card
    class="editor"
    flat
    width="100%"
    height="100%"
  >
    <bubble-menu
      class="bubble-menu"
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
          height="50px"
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
          height="50px"
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
          height="50px"
        >
          <v-icon>mdi-code-tags</v-icon>
        </v-btn>
    </bubble-menu>
      
    <EditorContent :editor="editor" />
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions, ComputedOptions } from 'vue';

import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';

interface Data {
  editor: Editor | null;
};

interface Props {};
interface Methods {};

interface Computed {
  editorHTML: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    EditorContent,
    BubbleMenu
  },

  data: () => ({
    editor: null as Editor | null,
  }),

  computed: {
    editorHTML () {
      if (this.editor) {
        return this.editor.getHTML();
      } else {
        return '';
      }
    }
  },

  watch: {
    editorHTML (str: string) {
      this.$emit('input', str);
    }
  },

  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit
      ],
      content: ''
    });
  },

  beforeDestroy () {
    this.editor?.destroy();
  },
});
</script>

<style lang="scss">
.editor {
  line-height: 30px;
  text-align: justify;
  
  > div {
    > div {
      padding: 20px;
    }

    .ProseMirror {
      border: 0 !important;
      padding: 12px !important;
      padding-top: 0;
    }

    .ProseMirror:focus-visible {
      outline: 0 !important;
    }
  }
}

.bubble-menu {
  display: flex;
  border-radius: 4px;
  overflow: hidden;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    filter: brightness(.9);

    &:hover,
    &.is-active {
      filter: brightness(1.5);
      opacity: 1;
    }
  }
}
</style>
