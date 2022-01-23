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
            <v-btn icon small>
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>

            <v-btn icon small>
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>

        </v-list-item-action>
      </v-list-item>

      <v-divider inset />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TPostComment } from '~/types/posts';

interface Data {};
interface Methods {};
interface Computed {};

interface Props {
  comment: TPostComment;
  darkerTheme: boolean;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    comment: { type: Object, required: true },
    darkerTheme: Boolean,
  },
});
</script>