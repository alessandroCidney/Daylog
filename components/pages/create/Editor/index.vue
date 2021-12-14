<template>
  <v-card
    id="createPostEditor"
    class="editor"
    flat
    width="100%"
    height="100%"
    tile
  >
    <ControlsMenu :editor="editor" />

    <BubbleMenu :editor="editor" />

    <EditorContent :editor="editor" />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';

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
  
  code {
    background-color: rgb(33, 33, 33) !important;
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
        background: #0D0D0D;
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

    .ProseMirror:focus-visible {
      outline: 0 !important;
    }
  }
}
</style>
