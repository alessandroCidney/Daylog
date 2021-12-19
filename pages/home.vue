<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" class="cloud">
        <v-card flat class="mt-3 light rounded-xl">
          <v-row align="center" justify="center" class="py-2">
            <v-col cols="3">
              <v-avatar>
                <v-img
                  src="https://firebasestorage.googleapis.com/v0/b/ponto-blog.appspot.com/o/users%2F-MqMUvjKWgiphY9ihXod%2Fuser_profile_photo.jpeg?alt=media&token=3aa35ba5-4d91-48c4-ae19-da0d5b67af97"
                />
              </v-avatar>
            </v-col>
            <v-col cols="8" class="pl-0">
              <div><strong>@cidn__</strong></div>
              <div><small>Iniciante</small></div>
            </v-col>
          </v-row>
        </v-card>

        <v-list class="mt-8 py-0 overflow-hidden rounded-xl white">

            <v-list-item active-class="space--text" to="/home">
              <v-list-item-icon><v-icon>mdi-home-variant</v-icon></v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item active-class="space--text" :to="'/users/' + firestoreUser.id">
              <v-list-item-icon><v-icon>mdi-account-circle</v-icon></v-list-item-icon>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>

            <v-list-item active-class="space--text" to="/settings">
              <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>

        </v-list>
      </v-col>
      <v-col cols="6">
        <CreatePostButton />

        <PostsList
          :posts="posts"
          :loadingPosts="loadingPosts"
          :like="like"
          :save="save"
        />

        <SpeedDial />
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
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
