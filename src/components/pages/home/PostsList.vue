<template>
  <v-row v-if="posts.length > 0" align="center" justify="center" class="mt-5">
    <v-col
      v-for="(post, index) in orderedPosts"
      :key="`home-post-${index}`"
      cols="12"
      class="d-flex align-center justify-center"
    >
      <ArticleCard :post="post" :like="() => like(post.id)" :save="() => save(post.id)" />
    </v-col>
  </v-row>

  <NoPostsAlert v-else-if="!loadingPosts" />
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleCard from '@/components/commons/ArticleCard.vue';
import NoPostsAlert from '@/components/commons/NoPostsAlert.vue';
import { TPost, TValidatedPost } from '@/types/posts';

interface Data {};
interface Methods {};

interface Computed {
  orderedPosts: TPost[] | TValidatedPost[];
};

interface Props {
  posts: TPost[] | TValidatedPost[];
  like: (postKey: string) => Promise<void>;
  save: (postKey: string) => Promise<void>;
  loadingPosts: boolean;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    ArticleCard,
    NoPostsAlert
  },

  props: {
    posts: { type: Array, required: true },
    like: { type: Function, required: true },
    save: { type: Function, required: true },
    loadingPosts: Boolean
  },

  computed: {
    orderedPosts () {
      return this.posts.sort((a, b) => b.created_at - a.created_at);
    }
  }
});
</script>