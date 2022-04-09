<template>
  <v-container fluid class="pa-0">
    <UserBackgroundPicture
      :src="pageUserBackgroundPicture"
    />

    <v-row justify-md="end" justify-sm="center" justify="center">
      <v-col md="3" sm="12" class="d-flex flex-column align-center justify-center" align-self="start">
        <v-avatar width="165px" height="165px" class="profile-avatar-photo translated">
          <v-img
            :src="pageUserProfilePhoto || require('@/assets/images/profile/user.jpg')"
            alt="Avatar photo"
          />
        </v-avatar>

        <p class="master-title master-font translated mt-3">
          @{{ pageUserUsername || '' }}
        </p>
      </v-col>

      <v-col md="8" sm="10" cols="10" class="py-16">
        <UserTabs
          :posts="posts"
          :saved-posts="savedPosts"
          :loading="loading"
          :fetch-posts="fetchPosts"
          :show-saved="pageUserIsLoggedUser"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';

import PostsService from '@/services/posts';
import Database from '@/services/database';

import UserBackgroundPicture from '@/components/pages/users/UserBackgroundPicture/index.vue';
import UserTabs from '@/components/pages/users/UserTabs/index.vue';

import OnPageUserData from '@/mixins/OnPageUserData';

import { TPost, TValidatedPost } from '@/types/posts';
import { FirestoreUser } from '@/types/users';

@Component({
  components: { UserBackgroundPicture, UserTabs },
  
  head (this: UserPage): object {
    return {
      title: this.pageUser?.username.replace(/^\w/, (c) => c.toUpperCase()),
      titleTemplate: '%s on Daylog'
    }
  }
})
export default class UserPage extends Mixins(OnPageUserData) {
  id = this.$route.params.id;

  postsService = new PostsService();
  usersDatabase = new Database('users');
  
  posts: TValidatedPost[] = [];
  savedPosts: TValidatedPost[] = [];

  loading = true;
  backgroundPhotoLoaded = false;

  async mounted () {
    if (!this.id) this.$router.push('/home');

    try {
      if (this.id === 'me') {
        this.pageUser = this.firestoreUser as FirestoreUser | null;
      } else {
        this.pageUser = await this.usersDatabase.get(this.id) as FirestoreUser | null;
      }

      await this.fetchPosts();
    
    } catch (error) {
      console.log('Error during mounted execution', error);
    } finally {
      this.loading = false;
    };
  };

  validatePost (post: TPost): TValidatedPost {
    const checkIfIsAlreadyLiked = (post: TPost) => 
      !!post.likes &&
      post.likes.findIndex(like => !!this.firestoreUserId && this.firestoreUserId === like.author_id) !== -1

    const checkIfIsAlreadySaved = (post: TPost) => this.firestoreUserSavedPosts.indexOf(post.id) !== -1

    return {
      ...post,
      alreadyLiked: checkIfIsAlreadyLiked(post),
      alreadySaved: checkIfIsAlreadySaved(post)
    };
  };

  async fetchPosts () {
    if (!this.pageUser) return;

    const fetchNormalPosts = async () => {
      const postsObject = await this.postsService.fetchPostsWhere('author_email', this.pageUserEmail);

      if (!postsObject) return;

      const posts = Object.values(postsObject);

      this.posts = posts
        .map(post => this.validatePost(post))
        .sort((a, b) => b.created_at - a.created_at);
    };

    const fetchSavedPosts = async () => {
      if (!this.pageUserIsLoggedUser) return;

      const savedPosts = await Promise.all(
        this.firestoreUserSavedPosts.map(savedPostKey => this.postsService.fetchPost(savedPostKey))
      );

      const existingSavedPosts = savedPosts.filter(savedPost => !!savedPost) as TPost[];

      this.savedPosts = existingSavedPosts
        .map(savedPost => this.validatePost(savedPost))
        .sort((a, b) => b.created_at - a.created_at);
    };

    fetchNormalPosts();
    fetchSavedPosts();
  };
};
</script>

<style lang="scss" scoped>
.profile-avatar-photo {
  border: 2px solid #FFF;
}

.translated {
  transform: translateY(-82.5px); 
}
</style>
