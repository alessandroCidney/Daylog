<template>
  <v-container class="mt-10 create-post-container">
    <v-row class="create-post-header mb-5">
      <v-col cols="6">
        <DropPhotoZone />
      </v-col>

      <v-col cols="6" align-self="center" >
        <v-textarea
          flat
          solo
          placeholder="Digite o título do seu novo artigo!"
          class="font-weight-bold article-creation-title-textarea"
          height="150px"
          no-resize
          color="#000"
        />
      </v-col>
    </v-row>

    <v-card min-height="500px" flat class="create-post-editor pa-2">
      <Editor :save="save" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import Editor from '@/components/commons/Editor.vue';
import DropPhotoZone from '@/components/utils/DropPhotoZone.vue';

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
    Editor,
    DropPhotoZone
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
  font-size: 2.5rem !important;
  
  textarea {
    line-height: 2.8rem !important;
  }
}

.create-post-container {
  width: 70%;
}

.create-post-editor {
  border: 3px solid #f0f0f0 !important;
}

.create-post-header {
  height: 280px;
}
</style>
