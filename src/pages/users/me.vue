<template>
  <v-container fluid class="pa-0">
    <v-img
      :src="pageUserBackgroundPicture || require('@/assets/images/b-background.jpg')"
      alt="Profile background photo"
      class="profile-background-photo"
      :height="backgroundPhotoLoaded ? 250 : 0"
      @load="backgroundPhotoLoaded = true"
    ></v-img>

    <v-skeleton-loader
      v-if="!backgroundPhotoLoaded"
      type="image"
      class="profile-background-photo"
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
        <v-row align="center" justify="center">
          <v-tabs color="space" background-color="base">
            <v-tab class="base">
              <v-icon left>mdi-view-grid</v-icon>
              Posts
            </v-tab>

            <v-tab v-if="pageUserIsLoggedUser" class="base">
              <v-icon left>mdi-bookmark-multiple</v-icon>
              Saved
            </v-tab>

            <v-tab-item class="base">
              <template v-if="loading">
                <v-col
                  v-for="i in 3"
                  :key="`post-profile-loading-${i}`"
                  md="11"
                  sm="12"
                  cols="12"
                >
                  <v-sheet
                    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  >
                    <v-skeleton-loader
                      class="mx-auto"
                      type="card, list-item-two-line"
                    ></v-skeleton-loader>
                  </v-sheet>
                </v-col>
              </template>

              <template v-else-if="posts.length > 0">
                <v-col
                  v-for="(post, index) in posts"
                  :key="`post-profile-${index}`"
                  md="11"
                  sm="12"
                  cols="12"
                >
                  <ArticleCard
                    :post="post"
                    :like="() => like(post.id)"
                    :save="() => save(post.id)"
                  />
                </v-col>
              </template>

              <template v-else>
                <NoPostsAlert />
              </template>
            </v-tab-item>

            <v-tab-item v-if="pageUserIsLoggedUser" class="base">
              <template v-if="loading">
                <v-col
                  v-for="i in 3"
                  :key="`post-profile-saved-loading-${i}`"
                  md="11"
                  sm="12"
                  cols="12"
                >
                  <v-sheet
                    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  >
                    <v-skeleton-loader
                      class="mx-auto"
                      type="card, list-item-two-line"
                    ></v-skeleton-loader>
                  </v-sheet>
                </v-col>
              </template>

              <template v-else-if="savedPosts.length > 0">
                <v-col
                  v-for="(post, index) in savedPosts"
                  :key="`post-profile-saved-${index}`"
                  md="11"
                  sm="12"
                  cols="12"
                >
                  <ArticleCard
                    :post="post"
                    :like="() => like(post.id)"
                    :save="() => save(post.id)"
                  />
                </v-col>
              </template>

              <template v-else>
                <NoPostsAlert />
              </template>
            </v-tab-item>
          </v-tabs>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component, Inject } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';

import PostsService from '@/services/posts';
import UsersService, { IUsers } from '@/services/users';

import ArticleCard from '@/components/commons/ArticleCard.vue';
import NoPostsAlert from '@/components/commons/NoPostsAlert.vue';

import OnPageUserData from '@/mixins/OnPageUserData';

import { TPost, TValidatedPost } from '@/types/posts';
import { FirestoreUser } from '@/types/users';

type TInjectedTheme = { isDark: boolean; };

@Component({
  components: { ArticleCard, NoPostsAlert },
  
  head (this: UserPage): object {
    return {
      title: this.pageUser?.username.replace(/^\w/, (c) => c.toUpperCase()),
      titleTemplate: '%s on Daylog'
    }
  }
})
export default class UserPage extends Mixins(OnPageUserData) {
  postsService = new PostsService();
  loggedUserService: IUsers | null = null;
  
  posts: TValidatedPost[] = [];
  savedPosts: TValidatedPost[] = [];

  loading = true;
  backgroundPhotoLoaded = false;

  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;
  
  @Action getCurrentFirestoreUser!: () => Promise<void>;

  async mounted () {
    try {
      this.pageUser = this.firestoreUser as FirestoreUser | null;

      if (!this.firestoreUserId) {
        this.loggedUserService = new UsersService(this.firestoreUserId);
      };

      await this.fetchPosts();
      await this.fetchSavedPosts();
    
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

    const postsObject = await this.postsService.fetchPostsWhere('author_email', this.pageUserEmail);

    if (!postsObject) return;

    const posts = Object.values(postsObject);

    this.posts = posts
      .map(post => this.validatePost(post))
      .sort((a, b) => b.created_at - a.created_at);
  };

  async fetchSavedPosts() {
    if (!this.pageUserIsLoggedUser) return;

    const savedPosts = await Promise.all(
      this.firestoreUserSavedPosts.map(savedPostKey => this.postsService.fetchPost(savedPostKey))
    );

    const existingSavedPosts = savedPosts.filter(savedPost => !!savedPost) as TPost[];

    this.savedPosts = existingSavedPosts
      .map(savedPost => this.validatePost(savedPost))
      .sort((a, b) => b.created_at - a.created_at);
  };

  async like (postKey: string) {
    if (!this.firestoreUser) return;

    const success = await this.postsService.toggleLike(postKey, this.firestoreUserId);

    if (success) {
      this.fetchPosts();
      this.fetchSavedPosts()
    };
  };

  async save (postKey: string) {
    if (!this.firestoreUser || !this.loggedUserService) return;

    const success = await this.loggedUserService.toggleSavedPost(postKey);

    if (success) {
      await this.getCurrentFirestoreUser();
      this.fetchPosts();
      this.fetchSavedPosts();
    };
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

.profile-background-photo {
  border-bottom: 1px solid rgb(240, 240, 240);

  .v-skeleton-loader__image {
    height: 250px !important;
  }
}
</style>
