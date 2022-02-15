<template>
  <v-container fluid class="pb-16 light">
    <v-row
      align="center"
      justify="center"
      :class="breakpoint !== 'sm' && 'mt-10'"
    >
      <v-col
        md="8"
        sm="10"
        cols="10"
        class="pb-0"
      >
        {{ postUpdatedAt ? 'Updated at' : '' }}
        {{ (postUpdatedAt || postCreatedAt) | formattedCreatedAt }}
        <v-icon color="space">mdi-circle-small</v-icon>
        <nuxt-link
          v-if="postAuthorId"
          :to="`/users/${postAuthorId}`"
          class="text-decoration-none space--text master-font"
        >
          @{{ postAuthor }}
        </nuxt-link>
      </v-col>

      <v-col
        md="8"
        sm="10"
        cols="10"
        :class="{
          'text-left': breakpoint !== 'sm',
          'text-center': breakpoint === 'sm',
          'mt-10': breakpoint === 'sm'
        }"
        >
          <v-skeleton-loader v-if="!postTitle" type="text" class="post-title" />
          <v-skeleton-loader v-if="!postTitle" type="text" class="post-title" />
          <v-skeleton-loader v-if="!postTitle" type="text" class="post-title" />
          <h1 class="post-title">{{ postTitle }}</h1>

        <div v-if="viewerIsTheAuthor">
          <v-btn icon color="space" :to="'/posts/' + postId + '/edit'">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn icon color="space" @click="handleDeletePost">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col
        md="8"
        sm="10"
        cols="10"
        :class="{
          'post-thumbnail': true,
          'pa-0 pt-4': true, 
          'mr-2': true,
          'no-border-radius': true
        }"
      >
        <v-img
          v-if="postThumbnail"
          :min-width="thumbLoaded ? '100%' : '0'"
          :height="thumbLoaded ? '400px' : '0'"
          :src="postThumbnail"
          :alt="'Imagem do post ' + (postTitle || '')"
          @load="thumbLoaded = true"
        />

        <v-skeleton-loader
          v-if="loading || (postThumbnail && !thumbLoaded)"
          class="post-thumb"
          type="image"
        />
      </v-col>
    </v-row>

    <PostContent :content="postContent" />

    <v-row align="center" justify="center" class="mt-16">
      <v-col md="8" sm="10">
        <v-row align="center" justify="center">
          <v-col md="2" sm="3" cols="3" class="d-flex align-center justify-center">
            <v-avatar width="70px" height="70px">
              <v-img
                :src="postAuthorPhotoURL || require('@/assets/images/profile/user.jpg')"
                width="150px"
              />
            </v-avatar>
          </v-col>

          <v-col md="3" sm="6" cols="6" class="d-flex align-start justify-center flex-column">
            <p class="text-left mb-0">
              Created by <span class="master-font">@{{ postAuthor || '' }}</span>
            </p>
            <p class="text-left mb-0">
              <small>on {{ postCreatedAt | formattedCreatedAt }}</small>
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <ArticleInteractionsArea
      v-if="post"
      :post="post"
      :comments="postComments || []"
      :updatePage="fetchPostData"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import PostData from '@/mixins/OnPostData';

import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';
import ArticleInteractionsArea from '@/components/pages/posts/ArticleInteractionsArea/index.vue';
import PostContent from '@/components/pages/posts/PostContent.vue';

import PostsService from '~/services/posts';

@Component({
  components: { IconButtonTooltip, ArticleInteractionsArea, PostContent },
  filters: {
    formattedCreatedAt (value: number | null) {
      if (!value) return;

      const date = new Date(value);

      const dateString = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      return dateString;
    }
  }
})
export default class PostPage extends Mixins(PostData) {
  id: string = this.$route.params.id;
  postsService = new PostsService();
  thumbLoaded = false;
  loading = false;

  async created () {
    this.loading = true;
    await this.fetchPostData();
    this.loading = false;
  };

  get breakpoint () {
    return this.$vuetify.breakpoint.name;
  };

  async fetchPostData () {
    if (!this.id) {
      this.$router.push('/home');
      return;
    };

    const post = await this.postsService.fetchPost(this.id);

    if (!post) {
      this.$router.push('/home');
      return;
    }

    this.post = post;
  };

  async handleDeletePost () {
    this.$nuxt.$loading.start();

    if (!this.viewerIsTheAuthor || !this.postId) {
      return;
    };

    await this.postsService.deletePostsWhere('id', this.postId);

    this.$nuxt.$loading.finish();
    this.$router.push('/home');
  };
};
</script>

<style lang="scss">
.post-thumbnail {
  overflow: hidden;
  border-radius: 0 8px 8px 0 !important;
}

.no-border-radius {
  border-radius: 0 0 0 0 !important;
}

.post-title {
  font-size: 5em;
  font-weight: 900 !important;
}

.post-thumb.v-skeleton-loader.v-skeleton-loader--is-loading {
  .v-skeleton-loader__image {
    min-height: 400px;
  }
}

.post-title.v-skeleton-loader.v-skeleton-loader--is-loading {
  
  &:nth-child(2n+1) {
    .v-skeleton-loader__text {
      min-height: 50px;
    }
  }
  
  &:nth-child(2n) {
    .v-skeleton-loader__text {
      min-height: 50px;
      width: 70%;
    }
  }
}

.commentsFormArea {
  width: 500px;
}

.commentContent {
  .v-list-item__subtitle {
    text-overflow: clip !important;
    word-break: break-all !important;
    max-width: 100% !important;
    overflow: visible !important;
    white-space: pre-line !important;
  }
}
</style>
