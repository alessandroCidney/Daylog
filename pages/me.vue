<template>
  <v-container fluid class="pa-0">
    <v-parallax
      :src="!!backgroundPhoto ? backgroundPhoto : require('@/assets/images/b-background.jpg')"
      alt="Profile background photo"
      class="profile-background-photo"
    ></v-parallax>

    <v-row justify-md="end" justify-sm="center">
      <v-col md="3" sm="12" class="d-flex flex-column align-center justify-center" align-self="start">
        <v-avatar width="165px" height="165px" class="profile-avatar-photo translated">
          <v-img
            :src="profilePhoto"
            alt="Avatar photo"
          />
        </v-avatar>

        <p class="master-title translated mt-3">
          @{{ firestoreUser ? firestoreUser.username : '' }}
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
import { mapGetters } from 'vuex';

import { StoreUser, FirestoreUser } from '@/types/users';
import { TPost } from '@/types/posts';
import PostsService, { IPostService } from '@/services/posts';

import ArticleCard from '@/components/commons/ArticleCard.vue';

interface Data {
  postsService: IPostService | null;
  posts: TPost[];
};

interface Methods {};
interface Props {};

interface Computed {
  user: StoreUser | null;
  firestoreUser: FirestoreUser | undefined;
  profilePhoto: string;
  backgroundPhoto: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    ArticleCard
  },

  data: () => ({
    postsService: null,
    posts: [] as TPost[]
  }),

  created () {
    this.postsService = new PostsService();
  },

  mounted () {
    if (this.user && this.user.firestoreUser && this.user.firestoreUser.email) {
      this.postsService?.fetchPostsWhere('author_email', this.user.firestoreUser.email)
        .then((posts) => {
          this.posts = Object.values(posts);
        });
    };
  },

  computed: {
    ...mapGetters(['user']),

    profilePhoto () {
      if (this.user && this.user.firestoreUser.profile_photo) {
        return this.user.firestoreUser.profile_photo;
      };

      return '';
    },

    backgroundPhoto () {
      if (this.user && this.user.firestoreUser.profile_background) {
        return this.user.firestoreUser.profile_background;
      };

      return '';
    },

    firestoreUser () {
      return this.user?.firestoreUser;
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
  height: 250px !important;
  border-bottom: 1px solid rgb(240, 240, 240);
}
</style>
