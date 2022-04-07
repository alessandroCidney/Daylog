<template>
  <div :class="darkerTheme ? 'base' : 'light'">
      <v-list-item>
        <v-list-item-avatar class="align-self-start">
          <v-avatar width="40px" height="40px">
            <v-img
              :src="comment.authorPhotoURL || require('@/assets/images/profile/user.jpg')"
              width="150px"
            />
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content class="maxWidth100 commentContent">
          <v-list-item-title class="mb-0 pb-0">@{{ comment.authorUsername }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ comment.content }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>

          <v-list-item-action-text>
            {{ comment.created_at | dateDiff }}
          </v-list-item-action-text>

          <div>
            <v-btn icon small :loading="loading.like" @click="handleLike">
              <v-icon>{{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>

            <v-btn icon small :loading="loading.delete" @click="handleDelete">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>

        </v-list-item-action>
      </v-list-item>

      <v-divider inset />
    </div>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Inject } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

import { ViewPostComment } from './ArticleInteractionsArea/index.vue';

import { PostsCommentsService } from '@/services/posts/comments';

import OnFirestoreUserData from '@/mixins/OnFirestoreUserData';

import { TPost } from '@/types/posts';
import { TApplicationMessage, TSnackbarMessage } from '@/types/messages';

import moment from 'moment';

@Component({
  filters: {
    dateDiff (time: string) {
      return moment(new Date(time)).fromNow();
    }
  }
})
export default class CommentComponent extends Mixins(OnFirestoreUserData) {
  @Inject() readonly updatePost!: () => Promise<void>;

  @Prop(Object) readonly comment!: ViewPostComment;
  @Prop(Boolean) readonly darkerTheme !: boolean;
  @Prop(Object) readonly post!: TPost;

  @Mutation showAppMessage!: (payload: TApplicationMessage | TSnackbarMessage) => void;

  loading = {
    like: false,
    delete: false
  };

  service = new PostsCommentsService(this.post.id);

  get liked () {
    return !!this.comment.likes?.find(like => like.author_id === this.firestoreUserId);
  };

  async handleLike () {
    this.$set(this.loading, 'like', true);
    const results = await this.service.like(this.comment.id, this.firestoreUserId);
    await this.updatePost();

    if (results && results.status && results.status === 'error') {
      this.showAppMessage({ ...results, active: true  })
    };

    this.$set(this.loading, 'like', false);
  };

  async handleDelete () {
    this.$set(this.loading, 'delete', true);
    const results = await this.service.delete(this.comment.id, this.firestoreUserId);
    await this.updatePost();

    if (results && results.status && results.status === 'error') {
      this.showAppMessage({ ...results, active: true  })
    };

    this.$set(this.loading, 'delete', false);
  };
};
</script>