<template>
  <div v-if="loading">
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
  </div>

  <div v-else-if="posts.length > 0">
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
  </div>

  <div v-else>
    <NoPostsAlert />
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Inject } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import PostsService from '@/services/posts';
import UsersService, { IUsers } from '@/services/users';

import ArticleCard from '@/components/commons/ArticleCard.vue';
import NoPostsAlert from '@/components/commons/NoPostsAlert.vue';

import { OnFirestoreUserData } from '@/mixins';

import { TValidatedPost } from '@/types/posts';

type TInjectedTheme = { isDark: boolean; };

@Component({
  components: { ArticleCard, NoPostsAlert },
})
export default class PostsTabComponent extends Mixins(OnFirestoreUserData) {
  @Prop(Array) readonly posts!: TValidatedPost[];
  @Prop(Array) readonly fetchPosts!: () => Promise<void>;
  @Prop(Boolean) readonly loading!: boolean;
  
  @Action getCurrentFirestoreUser!: () => Promise<void>;

  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;

  loggedUserService: IUsers | null = null;
  postsService = new PostsService();

  async like (postKey: string) {
    if (!this.firestoreUser) return;

    const success = await this.postsService.toggleLike(postKey, this.firestoreUserId);

    if (success) {
      this.fetchPosts();
    };
  };

  mounted () {
    if (!this.firestoreUserId) {
      this.loggedUserService = new UsersService(this.firestoreUserId);
    };
  };

  async save (postKey: string) {
    if (!this.firestoreUser || !this.loggedUserService) return;

    const success = await this.loggedUserService.toggleSavedPost(postKey);

    if (success) {
      await this.getCurrentFirestoreUser();
      this.fetchPosts();
    };
  };
}
</script>