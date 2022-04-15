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
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'

import ControlsMenu from './components/ControlsMenu.vue';
import BubbleMenu from './components/BubbleMenu.vue';

@Component({
  components: { EditorContent, BubbleMenu, ControlsMenu }
})
export default class EditorComponent extends Vue {
  editor: Editor | null = null;

  @Prop(String) readonly value!: string;

  mounted () {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Write the post content here :)'
        })
      ],
      onUpdate: () => {
        this.$emit('input', this.editor?.getHTML());
      }
    });
  };

  @Watch('value')
  onContentChanged (content: string) {
    const isSame = this.editor?.getHTML() === content;

    if (isSame) return;

    this.editor?.commands.setContent(content, false);
  };

  beforeDestroy () {
    this.editor?.destroy();
  };
};
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
        color: #00faff;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
          color: #00faff !important;
          padding: 0;
          background: #0D0D0D !important;
          font-size: 1.2rem;
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
