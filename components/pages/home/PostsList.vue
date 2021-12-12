<template>
  <v-row v-if="posts.length > 0" align="center" justify="center" class="mt-5">
    <v-col
      v-for="(post, index) in posts"
      :key="`home-post-${index}`"
      md="8"
      sm="10"
    >
      <ArticleCard
        :id="post.id"
        :title="post.title"
        :description="post.content.slice(0, 100).replace(/<.+?>/g, ' ')"
        :imageURL="post.thumbnail"
        :authorPhotoURL="post.author_photo_url"
        :already-liked="post.alreadyLiked"
        :already-saved="post.alreadySaved"
        :like="() => like(post.id)"
        :save="() => save(post.id)"
      />
    </v-col>
  </v-row>

  <div v-else-if="!loadingPosts" class="text-center">
    Nenhuma postagem encontrada ;-;
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleCard from '@/components/commons/ArticleCard.vue';
import { TPost, TValidatedPost } from '@/types/posts';

interface Data {};
interface Methods {};
interface Computed {};

interface Props {
  posts: TPost[] | TValidatedPost[];
  like: (postKey: string) => Promise<void>;
  save: (postKey: string) => Promise<void>;
  loadingPosts: boolean;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    ArticleCard
  },

  props: {
    posts: { type: Array, required: true },
    like: { type: Function, required: true },
    save: { type: Function, required: true },
    loadingPosts: Boolean
  }
});
</script>