<template>
  <v-autocomplete
    class="app-bar-search"
    solo
    dense
    color="space"
    placeholder="Search"
    hide-details
    :items="postTitles"
  >
    <template slot="prepend-inner">
      <v-btn
        icon
        small
        color="space"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue';

import PostsService, { IPostService } from '@/services/posts';
import { TPost } from '@/types/posts';

interface Data {
  postsService: IPostService | null;
  posts: TPost[];
};

interface Methods {};

interface Computed {
  postTitles: string[];
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    postsService: null,
    posts: []
  }),

  async created () {
    this.postsService = new PostsService();

    this.posts = await this.postsService.fetchPosts();
  },

  computed: {
    postTitles () {
      return this.posts.map((post) => post.title);
    }
  },
});
</script>
