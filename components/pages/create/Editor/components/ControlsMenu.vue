<template>
  <div class="editorControls py-1 px-1 d-flex align-center justify-center">
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
        <v-list-item
          v-for="index in 3"
          :key="'controlsMenu' + index"
          @click="editor.chain().focus().toggleHeading({ level: index }).run()"
        >
          <v-list-item-title>Heading {{ index }}</v-list-item-title>
        </v-list-item>

        <v-list-item
          @click="editor.chain().focus().setParagraph().run()"
        >
          <v-list-item-title>Normal</v-list-item-title>
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

    <v-spacer />

    <slot name="rightItems" />
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
