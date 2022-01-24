<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card flat class="mt-3 rounded-lg">
          <v-row align="center" justify="center" class="py-2">
            <v-col cols="3">
              <v-avatar>
                <v-img
                  :src="firestoreUserProfilePhoto"
                />
              </v-avatar>
            </v-col>
            <v-col cols="8" class="pl-0">
              <div><strong>@{{ firestoreUserUsername }}</strong></div>
              <div><small>Iniciante</small></div>
            </v-col>
          </v-row>
        </v-card>

        <v-list class="mt-8 py-0 overflow-hidden sidebarList">

            <v-list-item to="/home" active-class="sidebarItemActive">
              <template v-slot:default="{ active }">
                <v-list-item-icon><v-icon>{{ active ? 'mdi-home' : 'mdi-home-outline' }}</v-icon></v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </template>
            </v-list-item>

            <v-list-item :to="'/users/' + firestoreUser.id" active-class="sidebarItemActive">
              <template v-slot:default="{ active }">
                <v-list-item-icon><v-icon>{{ active ? 'mdi-account' : 'mdi-account-outline' }}</v-icon></v-list-item-icon>
                <v-list-item-title>Profile</v-list-item-title>
              </template>
            </v-list-item>

            <v-list-item to="/settings" active-class="sidebarItemActive">
              <template v-slot:default="{ active }">
                <v-list-item-icon><v-icon>{{ active ? 'mdi-cog' : 'mdi-cog-outline' }}</v-icon></v-list-item-icon>
                <v-list-item-title>Settings</v-list-item-title>
              </template>
            </v-list-item>

        </v-list>
      </v-col>
      <v-col cols="6">
        <CreatePostButton :profilePhoto="firestoreUserProfilePhoto" />

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
import Vue, { VueConstructor } from 'vue';
import { mapGetters, mapActions } from 'vuex';

import PostsService, { IPostService } from '@/services/posts';
import Users, { IUsers } from '@/services/users';

import { FirestoreUser } from '@/types/users';
import { TPost, TValidatedPost } from '@/types/posts';

import SpeedDial from '@/components/pages/home/SpeedDial.vue';
import CreatePostButton from '@/components/pages/home/CreatePostButton.vue';
import PostsList from '@/components/pages/home/PostsList.vue';
import FirestoreUserData, { Computed } from '@/mixins/FirestoreUserData';

interface Data {
  postsService: IPostService | null;
  usersService: IUsers | null;
  posts: TPost[] | TValidatedPost[];
  loadingPosts: boolean;
};

interface Props {};

interface Methods {
  like: (postKey: string) => Promise<void>;
  save: (postKey: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
  getCurrentFirestoreUser: () => Promise<void>;
};

export default (
  Vue as VueConstructor<Vue & InstanceType<typeof FirestoreUserData>>
).extend<Data, Methods, Computed, Props>({

  mixins: [FirestoreUserData],

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

<style lang="scss">
.sidebarList {
  .v-list-item {
    div {
      color: var(--v-space-base) !important;

      i {
        color: var(--v-space-base) !important;
      }
    }
  }
  
  .v-list-item--active {
    div {
      color: rgba(0,0,0,.87) !important;
    }
  }
}

.sidebarItemActive {
  font-weight: 700;

  &::before {
    background: #FFF;
    border: 2px solid var(--v-space-base);
    border-radius: 8px;
  }
}
</style>
