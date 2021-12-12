<template>
  <v-container>
    <CreatePostButton />

    <PostsList
      :posts="posts"
      :loadingPosts="loadingPosts"
      :like="like"
      :save="save"
    />

    <SpeedDial />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import PostsService, { IPostService } from '@/services/posts';
import Users, { IUsers } from '@/services/users';

import { FirestoreUser } from '@/types/users';
import { TPost, TValidatedPost } from '@/types/posts';

import SpeedDial from '@/components/pages/home/SpeedDial.vue';
import CreatePostButton from '@/components/pages/home/CreatePostButton.vue';
import PostsList from '@/components/pages/home/PostsList.vue';

interface Data {
  postsService: IPostService | null;
  usersService: IUsers | null;
  posts: TPost[] | TValidatedPost[];
  loadingPosts: boolean;
};

interface Props {};

interface Computed {
  firestoreUser: FirestoreUser | null;
};

interface Methods {
  like: () => Promise<void>;
  save: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  getCurrentFirestoreUser: () => Promise<void>;
};

export default Vue.extend<Data, Props, Computed, Methods>({
  components: {
    PostsList,
    SpeedDial,
    CreatePostButton
  },
  
  data: () => ({
    postsService: null,
    usersService: null,
    posts: [],
    loadingPosts: true,
  }),

  created () {
    this.postsService = new PostsService();
    
    const userId = this.firestoreUser?.id;

    if (userId) {
      this.usersService = new Users(userId);
    };
  },

  async mounted () {
    await this.fetchPosts();
    this.loadingPosts = false;
  },

  computed: {
    ...mapGetters(['firestoreUser']),
  },

  methods: {
    ...mapActions(['getCurrentFirestoreUser']),

    async fetchPosts () {
      const user = this.firestoreUser;

      if (!this.postsService || !user) {
        return;
      };

      const posts = await this.postsService.fetchPosts();

      this.posts = posts.map(post => ({
        ...post,
        alreadyLiked: post.likes &&
          post.likes.findIndex(like => like.author_id === user.id) !== -1,
        alreadySaved: user.savedPosts &&
          user.savedPosts.indexOf(post.id) !== -1
      }));
    },

    async like (postKey: string) {
      if (!this.postsService || !this.firestoreUser) {
        return;
      };

      const success = await this.postsService.toggleLike(postKey, this.firestoreUser.id);
      
      if (success) {
        await this.fetchPosts();
      };
    },

    async save (postKey: string) {
      if (!this.usersService || !this.firestoreUser) {
        return;
      };

      const success = await this.usersService.toggleSavedPost(postKey);

      if (success) {
        await this.getCurrentFirestoreUser();
        await this.fetchPosts();
      };
    }
  }
});
</script>
