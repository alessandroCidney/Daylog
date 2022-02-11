<template>
  <v-card
    id="createPostEditor"
    class="editor"
    flat
    width="100%"
    height="100%"
    tile
  >
    <ControlsMenu :editor="editor">
      <template v-slot:rightItems>
        <slot name="menuRightItems" />
      </template>
    </ControlsMenu>

    <slot name="centerItems" />

    <BubbleMenu v-if="editor" :editor="editor" />

    <EditorContent :editor="editor" />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'

import ControlsMenu from './components/ControlsMenu.vue';
import BubbleMenu from './components/BubbleMenu.vue';

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
    BubbleMenu,
    ControlsMenu
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
        StarterKit,
        Placeholder.configure({
          placeholder: 'Write the post content here :)'
        })
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
  
  code {
    background-color: #0D0D0D !important;
    color: #fff !important;
  }

> div {
    > div {
      padding: 20px;
    }

    .ProseMirror {
      border: 0 !important;
      padding: 12px !important;
      padding-top: 0;

      h1, h2, h3 {
        margin: 16px 0 !important;
      }

      pre {
        background: #0D0D0D !important;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.8rem;
        }
      }
    }

    .ProseMirror p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: #adb5bd;
      pointer-events: none;
      height: 0;
    }

    .ProseMirror:focus-visible {
      outline: 0 !important;
    }
  }
}
</style>
