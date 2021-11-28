<template>
  <v-container class="mt-10 create-post-container">
    <v-row class="create-post-header mb-5">
      <v-col cols="6" lg="6" md="6" sm="12">
        <DropPhotoZone v-model="thumb" />
      </v-col>

      <v-col cols="6" align-self="center" lg="6" md="6" sm="12">
        <v-textarea
          v-model="title"
          flat
          solo
          placeholder="Digite o título do seu novo artigo!"
          class="font-weight-bold article-creation-title-textarea"
          height="150px"
          no-resize
          color="space"
        />
      </v-col>
    </v-row>

    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            icon
            color="space"
            @click="save"
          >
            <v-icon size="24">
              mdi-content-save
            </v-icon>
          </v-btn>
        </template>
        <span>Save post</span>
      </v-tooltip>

    <v-card min-height="500px" flat class="create-post-editor pa-2">
      <Editor v-model="content" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import Editor from '@/components/commons/Editor.vue';
import DropPhotoZone from '@/components/utils/DropPhotoZone.vue';

interface Data {
  title: string;
  content: string;
  thumb: File | undefined;
};

interface Methods {
  save: () => void;
};

interface Props {};
interface Computed {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    Editor,
    DropPhotoZone
  },

  data: () => ({
    title: '',
    content: '',
    thumb: undefined,
  }),

  methods: {
    save () {
      console.log('TITLE', this.title, '\n', 'CONTENT', this.content, '\n' , 'THUMB', this.thumb)
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
