<template>
  <v-col cols="12" class="d-flex align-center justify-center">
    <IconButtonTooltip
      icon="mdi-heart-outline"
      text="Like"
      size="30"
      :action="() => {}"
    />

    <IconButtonTooltip
      icon="mdi-comment-outline"
      text="Comment"
      size="30"
      :action="toggleTextarea"
    />

    <IconButtonTooltip
      icon="mdi-bookmark-outline"
      text="Save"
      size="30"
      :action="() => {}"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';

import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';
import PostsService, { IPostService } from '~/services/posts';

export default Vue.extend({

  components: {
    IconButtonTooltip,
  },

  props: {
    postId: { type: String, required: true },
    updatePage: { type: Function, required: false, default: () => {} },
  },

  data () {
    return {
      postsService: null as IPostService | null,
    }
  },

  created () {
    this.postsService = new PostsService();
  },

  methods: {
    async toggleLike () {
      
    }
  }

});
</script>