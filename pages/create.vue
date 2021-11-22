<template>
  <v-container>
    <Editor />

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
