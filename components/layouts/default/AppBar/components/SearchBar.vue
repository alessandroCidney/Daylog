<template>
  <v-autocomplete
    v-model="selectedPost"
    class="app-bar-search"
    dense
    solo
    color="space"
    placeholder="Search"
    hide-details
    hide-no-data
    :items="posts"
    item-text="title"
    item-value="id"
    :loading="loading"
    :search-input.sync="search"
    @input="redirectToPostPage"
  >
    <template slot="prepend-inner">
      <v-btn
        icon
        small
        color="space"
        @click="redirectToPostPage"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
    </template>

    <template v-slot:item="data">
      <v-list-item-icon>
        <v-icon>mdi-application-edit</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ data.item.title }}
        </v-list-item-title>

        <v-list-item-subtitle>
          Created by @{{ data.item.author }}
        </v-list-item-subtitle>
      </v-list-item-content>
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
  selectedPost: TPost | null;
  loading: boolean;
  search: string;
};

interface Methods {
  redirectToPostPage: () => void;
};

interface Computed {};
interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  filters: {
    withoutHTMLTags (str: string) {
      return str.replace(/<.+?>/g, ' ');
    },
  },

  data: () => ({
    postsService: null,
    posts: [],
    selectedPost: null,
    loading: false,
    search: '',
  }),

  created () {
    this.postsService = new PostsService();
  },

  watch: {
    async search (searchString: string) {
      if (!this.postsService) {
        return;
      };

      if (!this.search) {
        return;
      };
      
      this.loading = true;

      this.posts = await this.postsService.searchPosts(searchString);
      
      this.loading = false;
    }
  },

  methods: {
    redirectToPostPage () {
      if (this.selectedPost) {
        this.$router.push(`/posts/${this.selectedPost}`);
      };
    },
  }
});
</script>

<style lang="scss" scoped>
.descriptionOverflow {
  width: 100px !important;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
