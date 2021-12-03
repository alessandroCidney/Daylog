<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-10">
      <v-col
        v-for="(post, index) in posts"
        :key="`home-post-${index}`"
        md="8"
        sm="10"
      >
        <ArticleCard
          :title="post.title"
          :description="post.content.slice(0, 100)"
          :imageURL="post.thumbnail"
          :authorPhotoURL="post.author_photo_url"
        />
      </v-col>

    </v-row>


    <v-btn color="#FFF" fab fixed right bottom to="/create">
      <v-icon color="space">mdi-plus</v-icon>
    </v-btn>
    
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import PostsService, { IPostService } from '@/services/posts';
import { TPost } from '@/types/posts';
import ArticleCard from '@/components/commons/ArticleCard.vue';

interface Data {
  postsService: IPostService | null;
  posts: TPost[];
};

interface Props {};
interface Computed {};
interface Methods {};

export default Vue.extend<Data, Props, Computed, Methods>({
  components: {
    ArticleCard
  },
  
  data: () => ({
    postsService: null,
    posts: []
  }),

  created () {
    this.postsService = new PostsService();
  },

  mounted () {
    this.postsService?.fetchPosts().then((posts) => {
      this.posts = posts;
    });
  }
});
</script>
