<template>
  <v-container fluid>
    <v-row>
      <v-col cols="7">
        <CreatePostButton :profilePhoto="firestoreUserProfilePhoto" />

        <PostsList
          :posts="posts"
          :loadingPosts="loadingPosts"
          :like="like"
          :save="save"
        />

        <SpeedDial />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import { TPost, TValidatedPost } from '~/types/posts';
import { FirestoreUser } from '~/types/users';

import PostsService from '@/services/posts';
import Users, { IUsers } from '~/services/users';

import OnFirestoreUserData from '~/mixins/OnFirestoreUserData';

import SpeedDial from '@/components/pages/home/SpeedDial.vue';
import CreatePostButton from '@/components/pages/home/CreatePostButton.vue';
import PostsList from '@/components/pages/home/PostsList.vue';
import SidebarListItem from '@/components/pages/home/SidebarListItem.vue';

@Component({
  components: { SpeedDial, CreatePostButton, PostsList, SidebarListItem }
})
export default class HomePage extends Mixins(OnFirestoreUserData) {
  postsService = new PostsService();
  usersService: IUsers | null = null;
  posts: TPost[] | TValidatedPost[] = [];
  loadingPosts = true;

  @Action getCurrentFirestoreUser!: () => Promise<void>;

  created () {
    const userId = this.firestoreUserId;

    if (userId) {
      this.usersService = new Users(userId);
    };
  };

  async mounted () {
    await this.fetchPosts();
    this.loadingPosts = false;
  };

  async fetchPosts () {
    const user = this.firestoreUser;

    if (!user) return;

    const posts = await this.postsService.fetchPosts();

    function alreadyLiked (post: TPost, user: FirestoreUser) {
      return post.likes && post.likes.findIndex(like => like.author_id === user.id) !== -1;
    };

    function alreadySaved (post: TPost, user: FirestoreUser) {
      return user.savedPosts && user.savedPosts.indexOf(post.id) !== -1;
    };

    this.posts = posts.map(post => ({
      ...post,
      alreadyLiked: alreadyLiked(post, user),
      alreadySaved: alreadySaved(post, user)
    }));
  };

  async like (postKey: string) {
    const user = this.firestoreUser;

    if (!user) return;

    const success = await this.postsService.toggleLike(postKey, user.id);

    if (success) await this.fetchPosts();
  };

  async save (postKey: string) {
    const user = this.firestoreUser;

    if (!user) return;

    const success = await this.usersService?.toggleSavedPost(postKey);

    if (success) {
      await this.getCurrentFirestoreUser();
      await this.fetchPosts();
    };
  };
};
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
</style>
