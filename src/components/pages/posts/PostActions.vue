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
      icon="mdi-bookmark-outline"
      text="Save"
      size="30"
      :action="() => {}"
    />
  </v-col>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import PostsService from '@/services/posts';

import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';

import OnFirestoreUserData from '@/mixins/OnFirestoreUserData';

import { TPost } from '@/types/posts';

@Component({
  components: { IconButtonTooltip }
})
export default class PostActionsComponent extends Mixins(OnFirestoreUserData) {
  postsService = new PostsService();

  @Prop(Object) readonly post!: TPost;
  @Prop(Function) readonly updatePage!: () => Promise<void>;
  @Prop(Function) readonly toggleTextarea!: () => void;

  get postLiked () {
    if (!this.post.likes) return false;

    return this.post.likes.findIndex(like => like.author_id === this.firestoreUserId) !== -1;
  };

  async toggleLike () {
    const success = await this.postsService.toggleLike(this.post.id, this.firestoreUserId);

    if (success) await this.updatePage();
  };
};
</script>