<template>
  <v-container fluid class="pa-0">
    <v-img
      :src="backgroundPhoto || require('@/assets/images/b-background.jpg')"
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
            :src="avatar || require('@/assets/images/profile/user.jpg')"
            alt="Avatar photo"
          />
        </v-avatar>

        <p class="master-title translated mt-3">
          @{{ username || '' }}
        </p>
      </v-col>

      <v-col md="8" sm="10" cols="10" class="py-16">
        <v-row align="center" justify="center">
          <v-tabs color="space">
            <v-tab>
              <v-icon left>mdi-view-grid</v-icon>
              My posts
            </v-tab>

            <v-tab>
              <v-icon left>mdi-bookmark-multiple</v-icon>
              Saved
            </v-tab>

              <v-tab-item>
                <v-col
                  v-for="(post, index) in posts"
                  :key="`post-profile-${index}`"
                  md="11"
                  sm="12"
                  cols="12"
                >
                  <ArticleCard
                    :id="post.id"
                    :title="post.title"
                    :description="post.content.slice(0, 100).replace(/<.+?>/g, ' ')"
                    :imageURL="post.thumbnail"
                    :authorPhotoURL="post.author_photo_url"
                    :already-liked="post.alreadyLiked"
                    :like="() => like(post.id)"
                  />
                </v-col>
              </v-tab-item>

              <v-tab-item>
                <v-col
                  v-for="(post, index) in posts"
                  :key="`post-profile-${index}`"
                  cols="11"
                >
                  <ArticleCard
                    :id="post.id"
                    :title="post.title"
                    :description="post.content.slice(0, 100).replace(/<.+?>/g, ' ')"
                    :imageURL="post.thumbnail"
                    :authorPhotoURL="post.author_photo_url"
                    :already-liked="post.alreadyLiked"
                    :like="() => like(post.id)"
                  />
                </v-col>
              </v-tab-item>
          </v-tabs>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { TPost } from '@/types/posts';
import { FirestoreUser } from '@/types/users';
import Database, { IDatabase } from '@/services/database';
import PostsService, { IPostService } from '@/services/posts';

import ArticleCard from '@/components/commons/ArticleCard.vue';

interface Data {
  id: string;
  user: FirestoreUser | null;
  postsService: IPostService | null;
  usersDatabase: IDatabase | null;
  posts: TPost[];
  backgroundPhotoLoaded: boolean;
};

interface Methods {
  fetchPosts: () => Promise<void>;
  like: (postKey: string) => Promise<void>;
};

interface Props {};

interface Computed {
  username: string;
  avatar: string;
  backgroundPhoto: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    ArticleCard
  },

  data: () => ({
    id: '',
    user: null,
    postsService: null,
    usersDatabase: null,
    posts: [],
    parallaxLoaded: false,
    backgroundPhotoLoaded: false,
  }),

  async mounted () {
    this.id = this.$route.params.id;
    
    if (!this.id) {
      return;
    };

    this.usersDatabase = new Database('users');
    this.postsService = new PostsService();

    this.user = await this.usersDatabase.get(this.id) as FirestoreUser | null;
    
    await this.fetchPosts();
  },

  computed: {
    username () {
      if (this.user) {
        return this.user.username;
      };

      return '';
    },

    avatar () {
      if (this.user) {
        return this.user.profile_photo;
      };

      return '';
    },

    backgroundPhoto () {
      if (this.user) {
        return this.user.profile_background;
      };

      return '';
    },
  },

  methods: {
    async fetchPosts () {
      if (!this.user || !this.postsService) {
        return;
      };

      const postsObject = await this.postsService.fetchPostsWhere(
        'author_email',
        this.user.email
      );

      if (!postsObject) {
        return;
      };

      this.posts = Object.values(postsObject).map(post => ({
        ...post,
        alreadyLiked: post.likes &&
          post.likes.findIndex(like => this.user && like.author_id === this.user.id) !== -1
      }));
    },

    async like (postKey: string) {
      if (!this.postsService || !this.user) {
        return;
      };

      const success = await this.postsService.toggleLike(postKey, this.user.id);
      
      if (success) {
        await this.fetchPosts();
      };
    }
  }
});
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
