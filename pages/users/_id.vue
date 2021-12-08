<template>
  <v-container fluid class="pa-0">
    <v-parallax
      :src="backgroundPhoto || require('@/assets/images/b-background.jpg')"
      alt="Profile background photo"
      class="profile-background-photo"
      :height="250"
      ref="parallaxRef"
    ></v-parallax>

    <v-row justify-md="end" justify-sm="center">
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

      <v-col md="8" sm="12" class="py-16">
        <v-row align="center" justify="center">
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
            />
          </v-col>
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
  parallaxLoaded: boolean;
};

interface Methods {};
interface Props {};
interface Computed {};

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
    parallaxLoaded: false
  }),

  async mounted () {
    this.id = this.$route.params.id;
    
    if (!this.id) {
      return;
    };

    this.usersDatabase = new Database('users');
    this.postsService = new PostsService();

    this.user = await this.usersDatabase.get(this.id) as FirestoreUser | null;
    
    if (!this.user) {
      return;
    };

    this.posts = Object.values(await this.postsService.fetchPostsWhere('author_email', this.user.email));
  },

  updated () {
    (this.$refs.parallaxRef as any).$refs.img.onload = () => {
      this.parallaxLoaded = true;
    };
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
}
</style>
