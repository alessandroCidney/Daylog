<template>
  <v-container fluid>
    <v-row align="center" justify="start" class="mt-10">
      <v-col cols="6" class="post-thumbnail pa-0 mr-2">
        <v-img
          min-width="100%"
          min-height="400px"
          :src="post? post.thumbnail : ''"
        />
      </v-col>

      <v-col cols="5" class="text-left">
        <h1 class="post-title">{{ post ? post.title : null }}</h1>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-10">
      <v-col cols="8" class="pa-0 mr-2">
        <v-card flat>
          <v-card-text
            class="black--text post-content"
            v-html="post ? post.content : ''"
          />
        </v-card>
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { TPost } from '@/types/posts';
import PostsService, { IPostService } from '@/services/posts';

interface Data {
  post: TPost | null;
  postsService: IPostService | null;
};

interface Methods {};
interface Props {};

interface Computed {
  id: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },

  data: () => ({
    post: null,
    postsService: null,
  }),

  async created () {
    this.postsService = new PostsService();
    const post = await this.postsService.fetchPost(this.id);

    if (!post) {
      this.$router.push('/home');
      return;
    };

    this.post = post;
  },
});
</script>

<style lang="scss">
.post-thumbnail {
  overflow: hidden;
  border-radius: 0 8px 8px 0 !important;
}

.post-title {
  font-size: 3.5em;
  font-weight: 900 !important;
}

.post-content {
  font-size: 19px !important;
  line-height: 38px;
}
</style>
