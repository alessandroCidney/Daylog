<template>
  <v-container fluid>
    <v-row
      align="center"
      justify-md="start"
      justify-sm="center"
      class="mt-10"
    >
      <v-col
        md="6"
        sm="12"
        :class="{
          'post-thumbnail': true,
          'pa-0': true, 
          'mr-2': true,
          'no-border-radius': breakpoint === 'sm'
        }"
      >
        <v-img
          min-width="100%"
          min-height="400px"
          :src="thumbnail"
        />
      </v-col>

      <v-col
        md="5"
        sm="10"
        :class="{
          'text-left': breakpoint !== 'sm',
          'text-center': breakpoint === 'sm'
        }"
        >
        <h1 class="post-title">{{ title }}</h1>
        <p class="mt-2">
          Created by 
          <nuxt-link
            :to="`/users/${authorId}`"
            class="text-decoration-none"
          >
            @{{ author }}
          </nuxt-link>
        </p>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-10">
      <v-col md="8" sm="10" class="pa-0 mr-2">
        <v-card flat>
          <v-card-text
            class="black--text post-content"
            v-html="content"
          />
        </v-card>
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { TPost } from '@/types/posts';
import { FirestoreUser } from '@/types/users';
import PostsService, { IPostService } from '@/services/posts';
import Database, { IDatabase } from '@/services/database';

interface Data {
  post: TPost | null;
  postsService: IPostService | null;
  usersDatabase: IDatabase | null;
  id: string;
  authorId: string;
};

interface Methods {};
interface Props {};

interface Computed {
  thumbnail: string;
  title: string;
  content: string;
  author: string;
  breakpoint: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    post: null,
    postsService: null,
    usersDatabase: null,
    id: '',
    authorId: ''
  }),

  async created () {
    this.id = this.$route.params.id;

    if (!this.id) {
      this.$router.push('/home');
      return;
    };

    this.postsService = new PostsService();
    const post = await this.postsService.fetchPost(this.id);

    if (!post) {
      this.$router.push('/home');
      return;
    };

    this.post = post;

    this.usersDatabase = new Database('users');
    
    const author = await this.usersDatabase.getWhere(
      'email',
      this.post.author_email
    ) as Record<string, FirestoreUser> | null;

    if (!author) {
      return;
    };

    this.authorId = Object.keys(author)[0];
  },

  computed: {
    thumbnail () {
      return (this.post && this.post.thumbnail) ? this.post.thumbnail : '';
    },

    title () {
      return (this.post && this.post.title) ? this.post.title : '';
    },

    content () {
      return (this.post && this.post.content) ? this.post.content : '';
    },

    author () {
      return (this.post && this.post.author) ? this.post.author : '';
    },

    breakpoint () {
      return this.$vuetify.breakpoint.name;
    }
  }
});
</script>

<style lang="scss">
.post-thumbnail {
  overflow: hidden;
  border-radius: 0 8px 8px 0 !important;
}

.no-border-radius {
  border-radius: 0 0 0 0 !important;
}

.post-title {
  font-size: 3.5em;
  font-weight: 900 !important;
}

.post-content {
  font-size: 19px !important;
  line-height: 38px;

  pre {
    white-space: pre-line;
    background-color: rgb(33, 33, 33);
    color: #fff;
  }
}
</style>
