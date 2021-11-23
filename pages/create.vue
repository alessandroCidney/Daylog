<template>
  <v-container class="mt-10 create-post-container">
    <v-textarea
      solo
      flat
      placeholder="Digite o título do seu novo artigo!"
      class="font-weight-bold article-creation-title-textarea"
      height="80px"
      no-resize
      color="#000"
    />

    <v-card min-height="500px" flat>
      <Editor :save="save" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import Editor from '@/components/commons/Editor.vue';

interface Data {
  content: string;
};

interface Methods {
  save: (content: string) => void;
};

interface Props {};
interface Computed {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    Editor
  },

  data: () => ({
    content: '',
  }),

  methods: {
    save (content: string): void {
      console.log(content);
    },
  },
});
</script>

<style lang="scss">
.article-creation-title-textarea {
  font-size: 2em !important;
}

.create-post-container {
  width: 70%;
}
</style>
