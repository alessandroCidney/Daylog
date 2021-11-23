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
      <Editor />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import Editor from '@/components/commons/Editor.vue';

export default Vue.extend({
  components: {
    Editor
  },

  data: () => ({
    content: '',
  })
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
