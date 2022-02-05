<template>
  <v-col cols="12" class="d-flex align-center justify-center">
    <IconButtonTooltip
      :icon="postLiked ? 'mdi-heart' : 'mdi-heart-outline'"
      :text="postLiked ? 'Remove like' : 'Like'"
      size="30"
      :action="toggleLike"
    />

    <IconButtonTooltip
      icon="mdi-comment-outline"
      text="Comment"
      size="30"
      :action="toggleTextarea"
    />

    <IconButtonTooltip
      :icon="postSaved ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
      text="Save"
      size="30"
      :action="toggleSave"
    />
  </v-col>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import PostsService from '@/services/posts';
import Users, { IUsers } from '@/services/users';

import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';

import OnFirestoreUserData from '@/mixins/OnFirestoreUserData';

import { TPost } from '@/types/posts';

@Component({
  components: { IconButtonTooltip }
})
export default class PostActionsComponent extends Mixins(OnFirestoreUserData) {
  postsService = new PostsService();
  usersService: IUsers | null = null;

  @Prop(Object) readonly post!: TPost;
  @Prop(Function) readonly updatePage!: () => Promise<void>;
  @Prop(Function) readonly toggleTextarea!: () => void;

  @Action getCurrentFirestoreUser!: () => Promise<void>;

  created () {
    const userId = this.firestoreUserId;

    if (userId) {
      this.usersService = new Users(userId);
    };
  };

  get postLiked () {
    if (!this.post.likes) return false;

    return this.post.likes.findIndex(like => like.author_id === this.firestoreUserId) !== -1;
  };

  get postSaved () {
    return this.firestoreUser?.savedPosts && this.firestoreUser.savedPosts.indexOf(this.post.id) !== -1;
  };

  async toggleLike () {
    const success = await this.postsService.toggleLike(this.post.id, this.firestoreUserId);

    if (success) await this.updatePage();
  };

  async toggleSave () {
    const success = await this.usersService?.toggleSavedPost(this.post.id);

    if (success) {
      await this.getCurrentFirestoreUser();
      await this.updatePage();
    };
  };
};
</script>