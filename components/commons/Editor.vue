<template>
  <v-row align="center" justify="center">
    <v-col cols="8" class="editor">
      <EditorContent :editor="editor" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';

export default Vue.extend({
  components: {
    EditorContent
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    } as PropOptions<string>
  },

  data: () => ({
    editor: null as Editor | null,
  }),

  watch: {
    modelValue (value: string) {
      const isEqual = this.editor?.getHTML() === value;

      if (isEqual) {
        return;
      };

      this.editor?.commands.setContent(value, false);
    },
  },

  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor?.getHTML())
      }
    });
  },

  beforeDestroy () {
    this.editor?.destroy();
  },
});
</script>

<style lang="scss">
.editor {
  border: 1px solid #000 !important;

  width: 100%;
  height: 500px;

  > div {
    width: 100% !important;
    height: 100% !important;

    > div {
      width: 100% !important;
      height: 100% !important;

      padding: 20px;
    }

    .ProseMirror-focused {
      border: 0 !important;
    }
  }
}
</style>
