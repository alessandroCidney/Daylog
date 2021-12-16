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
          <v-tabs color="space" background-color="cloud">
            <v-tab>
              <v-icon left>mdi-view-grid</v-icon>
              Posts
            </v-tab>

            <v-tab v-if="pageUserIsLoggedUser">
              <v-icon left>mdi-bookmark-multiple</v-icon>
              Saved
            </v-tab>

              <v-tab-item class="cloud">
                <template v-if="posts.length > 0">
                  <v-col
                    v-for="(post, index) in posts"
                    :key="`post-profile-${index}`"
                    md="11"
                    sm="12"
                    cols="12"
                    class="cloud"
                  >
                    <ArticleCard
                      :id="post.id"
                      :title="post.title"
                      :description="post.content.slice(0, 100).replace(/<.+?>/g, ' ')"
                      :imageURL="post.thumbnail"
                      :authorPhotoURL="post.author_photo_url"
                      :already-liked="post.alreadyLiked"
                      :already-saved="post.alreadySaved"
                      :like="() => like(post.id)"
                      :save="() => save(post.id)"
                    />
                  </v-col>
                </template>

                <template v-else>
                  <NoPostsAlert />
                </template>
              </v-tab-item>

              <v-tab-item v-if="pageUserIsLoggedUser" class="cloud">
                <template v-if="posts.length > 0">
                  <v-col
                    v-for="(post, index) in savedPosts"
                    :key="`post-profile-${index}`"
                    md="11"
                    sm="12"
                    cols="12"
                    class="cloud"
                  >
                    <ArticleCard
                      :id="post.id"
                      :title="post.title"
                      :description="post.content.slice(0, 100).replace(/<.+?>/g, ' ')"
                      :imageURL="post.thumbnail"
                      :authorPhotoURL="post.author_photo_url"
                      :already-liked="post.alreadyLiked"
                      :already-saved="post.alreadySaved"
                      :like="() => like(post.id)"
                      :save="() => save(post.id)"
                    />
                  </v-col>
                </template>

                <template v-else>
                  <NoPostsAlert />
                </template>
              </v-tab-item>
          </v-tabs>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { TPost, TValidatedPost } from '@/types/posts';
import { FirestoreUser } from '@/types/users';
import Database, { IDatabase } from '@/services/database';
import PostsService, { IPostService } from '@/services/posts';
import Users, { IUsers } from '@/services/users';

import ArticleCard from '@/components/commons/ArticleCard.vue';
import NoPostsAlert from '@/components/commons/NoPostsAlert.vue';

interface Data {
  id: string;
  pageUser: FirestoreUser | null;
  postsService: IPostService | null;
  usersDatabase: IDatabase | null;
  usersService: IUsers | null;
  posts: TPost[] | TValidatedPost[];
  savedPosts: TPost[] | TValidatedPost[];
  backgroundPhotoLoaded: boolean;
};

interface Methods {
  fetchPosts: () => Promise<void>;
  fetchSavedPosts: () => Promise<void>;
  like: (postKey: string) => Promise<void>;
  save: (postKey: string) => Promise<void>;
  getCurrentFirestoreUser: () => Promise<void>;
};

interface Props {};

interface Computed {
  username: string;
  avatar: string;
  backgroundPhoto: string;
  firestoreUser: FirestoreUser | null;
  pageUserIsLoggedUser: boolean;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    ArticleCard,
    NoPostsAlert
  },

  data: () => ({
    id: '',
    pageUser: null,
    postsService: null,
    usersDatabase: null,
    usersService: null,
    posts: [],
    savedPosts: [],
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

    this.pageUser = await this.usersDatabase.get(this.id) as FirestoreUser | null;
    
    if (this.firestoreUser) {
      this.usersService = new Users(this.firestoreUser.id);
    };

    await this.fetchPosts();
    await this.fetchSavedPosts();
  },

  computed: {
    ...mapGetters(['firestoreUser']),

    pageUserIsLoggedUser () {
      if (!this.firestoreUser) {
        return false;
      };
      
      if (this.firestoreUser?.id === this.pageUser?.id) {
        return true;
      };

      return false;
    },

    username () {
      if (this.pageUser) {
        return this.pageUser.username;
      };

      return '';
    },

    avatar () {
      if (this.pageUser) {
        return this.pageUser.profile_photo;
      };

      return '';
    },

    backgroundPhoto () {
      if (this.pageUser) {
        return this.pageUser.profile_background;
      };

      return '';
    },
  },

  methods: {
    ...mapActions(['getCurrentFirestoreUser']),

    async fetchPosts () {
      if (!this.pageUser || !this.postsService) {
        return;
      };

      const postsObject = await this.postsService.fetchPostsWhere(
        'author_email',
        this.pageUser.email
      );

      if (!postsObject) {
        return;
      };

      this.posts = Object.values(postsObject).map(post => ({
        ...post,
        alreadyLiked: post.likes &&
          post.likes.findIndex(like => this.firestoreUser && like.author_id === this.firestoreUser.id) !== -1,
        alreadySaved: this.firestoreUser && this.firestoreUser.savedPosts &&
          this.firestoreUser.savedPosts.indexOf(post.id) !== -1
      }));
    },

    async fetchSavedPosts () {
      if (!this.pageUserIsLoggedUser) {
        return;
      };

      const savedPosts = this.firestoreUser?.savedPosts;

      if (!savedPosts) {
        return;
      };

      let results = await Promise.all(
        savedPosts.map(postKey => this.postsService?.fetchPost(postKey))
      );

      let posts = results.filter(post => !!post) as TPost[];

      this.savedPosts = posts.map(post => ({
        ...post,
        alreadyLiked: post.likes &&
          post.likes.findIndex(like => this.firestoreUser && like.author_id === this.firestoreUser.id) !== -1,
        alreadySaved: this.firestoreUser && this.firestoreUser.savedPosts &&
          this.firestoreUser.savedPosts.indexOf(post.id) !== -1
      }));
    },

    async like (postKey: string) {
      if (!this.postsService || !this.firestoreUser) {
        return;
      };

      const success = await this.postsService.toggleLike(postKey, this.firestoreUser.id);
      
      if (success) {
        this.fetchPosts();
        this.fetchSavedPosts()
      };
    },

    async save (postKey: string) {
      if (!this.usersService || !this.firestoreUser) {
        return;
      };

      const success = await this.usersService.toggleSavedPost(postKey);

      if (success) {
        await this.getCurrentFirestoreUser();
        this.fetchPosts();
        this.fetchSavedPosts();
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
