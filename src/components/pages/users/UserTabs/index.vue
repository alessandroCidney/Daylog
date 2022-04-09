<template>
  <v-row align="center" justify="center">
    <v-tabs color="space" background-color="base">
      <v-tab v-if="showPosts" class="base">
        <v-icon left>mdi-view-grid</v-icon>
        Posts
      </v-tab>

      <v-tab v-if="showSaved" class="base">
        <v-icon left>mdi-bookmark-multiple</v-icon>
        Saved
      </v-tab>

      <v-tab-item v-if="showPosts" class="base">
        <PostsTab
          :posts="posts"
          :loading="loading"
          :fetch-posts="fetchPosts"
        />
      </v-tab-item>

      <v-tab-item v-if="showSaved" class="base">
        <PostsTab
          :posts="savedPosts"
          :loading="loading"
          :fetch-posts="fetchPosts"
        />
      </v-tab-item>
    </v-tabs>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TValidatedPost } from '@/types/posts';

import PostsTab from './components/PostsTab/index.vue'

@Component({
  components: { PostsTab },
})
export default class UserTabs extends Vue {
  @Prop(Array) readonly posts!: TValidatedPost[];
  @Prop(Array) readonly savedPosts!: TValidatedPost[];
  @Prop(Function) readonly fetchPosts!: () => Promise<void>;
  @Prop({ type: Boolean, default: true }) readonly showSaved!: boolean;
  @Prop({ type: Boolean, default: true }) readonly showPosts!: boolean;
  @Prop(Boolean) readonly loading!: boolean;
};
</script>