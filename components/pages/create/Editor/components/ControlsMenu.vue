<template>
  <div class="editorControls py-1 px-1">
    <v-btn
      color="space"
      icon
      @click="editor.chain().focus().toggleBold().run()"
    >
      <v-icon>mdi-format-bold</v-icon>
    </v-btn>

    <v-btn
      color="space"
      icon
      @click="editor.chain().focus().toggleItalic().run()"
    >
      <v-icon>mdi-format-italic</v-icon>
    </v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="space"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-format-size</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          <v-list-item-icon>
            <v-icon>mdi-format-header-1</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Heading 1</v-list-item-title>
        </v-list-item>

        <v-list-item @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          <v-list-item-icon>
            <v-icon>mdi-format-header-2</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Heading 2</v-list-item-title>
        </v-list-item>

        <v-list-item @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
          <v-list-item-icon>
            <v-icon>mdi-format-header-3</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Heading 3</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      color="space"
      icon
      @click="editor.chain().focus().toggleCode().run()"
    >
      <v-icon>mdi-code-tags</v-icon>
    </v-btn>

    <v-btn
      color="space"
      icon
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      <v-icon>mdi-code-not-equal-variant</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Editor } from '@tiptap/vue-2';

interface Data {};
interface Methods {};
interface Computed {};

interface Props {
  editor: Editor
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    editor: { type: Editor, required: true }
  }
});
</script>

<style lang="scss">
.editorControls {
  border-bottom: 1px solid #f0f0f0 !important;
}
</style>
