<template>
  <v-container fluid class="pb-16">
    <v-row
      align="center"
      justify-md="start"
      justify-sm="center"
      :class="breakpoint !== 'sm' && 'mt-10'"
    >
      <v-col
        md="6"
        sm="12"
        :class="{
          'post-thumbnail': true,
          'pa-0': true, 
          'mr-2': true,
          'no-border-radius': breakpoint === 'sm'
        }"
      >
        <v-img
          :min-width="thumbLoaded ? '100%' : '0'"
          :height="thumbLoaded ? '400px' : '0'"
          :src="thumbnail"
          :alt="'Imagem do post ' + title"
          @load="thumbLoaded = true"
        />

        <v-skeleton-loader
          v-if="!thumbLoaded"
          class="post-thumb"
          type="image"
        />
      </v-col>

      <v-col
        md="5"
        sm="10"
        :class="{
          'text-left': breakpoint !== 'sm',
          'text-center': breakpoint === 'sm',
          'mt-10': breakpoint === 'sm'
        }"
        >
          <v-skeleton-loader v-if="!title" type="text" class="post-title" />
          <v-skeleton-loader v-if="!title" type="text" class="post-title" />
          <v-skeleton-loader v-if="!title" type="text" class="post-title" />
          <h1 class="post-title">{{ title }}</h1>
        <p class="mt-2">
          Created by 
          <nuxt-link
            :to="`/users/${authorId}`"
            class="text-decoration-none"
          >
            @{{ author }}
          </nuxt-link>
        </p>

        <div v-if="viewerIsTheAuthor">
          <v-btn icon color="space">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn icon color="space" @click="handleDeletePost">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-10">
      <v-col md="8" sm="10" class="pa-0 mr-2">
        <v-card flat>
          <div
            class="post-content"
            v-html="content"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="mt-16">
      <v-col md="8" sm="10">
        <v-row align="center" justify="center">
          <v-col md="2" sm="3" cols="3" class="d-flex align-center justify-center">
            <v-avatar width="70px" height="70px">
              <v-img
                :src="authorPhotoURL || require('@/assets/images/profile/user.jpg')"
                width="150px"
              />
            </v-avatar>
          </v-col>

          <v-col md="3" sm="6" cols="6" class="d-flex align-start justify-center flex-column">
            <p class="text-left mb-0">
              Created by <span class="font-weight-bold">@{{ author }}</span>
            </p>
            <p class="text-left mb-0">
              <small>on {{ createdAt }}</small>
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TPost } from '@/types/posts';
import { FirestoreUser, StoreUser } from '@/types/users';
import PostsService, { IPostService } from '@/services/posts';
import Database, { IDatabase } from '@/services/database';

interface Data {
  post: TPost | null;
  postsService: IPostService | null;
  usersDatabase: IDatabase | null;
  id: string;
  authorId: string;
  thumbLoaded: boolean;
};

interface Methods {
  handleDeletePost: () => Promise<void>;
};

interface Props {};

interface Computed {
  user: StoreUser | null;
  thumbnail: string;
  title: string;
  content: string;
  author: string;
  breakpoint: string;
  viewerIsTheAuthor: boolean;
  authorPhotoURL: string;
  createdAt: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    post: null,
    postsService: null,
    usersDatabase: null,
    id: '',
    authorId: '',
    thumbLoaded: false
  }),

  async created () {
    this.id = this.$route.params.id;

    if (!this.id) {
      this.$router.push('/home');
      return;
    };

    this.postsService = new PostsService();
    const post = await this.postsService.fetchPost(this.id);

    if (!post) {
      this.$router.push('/home');
      return;
    };

    this.post = post;

    this.usersDatabase = new Database('users');
    
    const author = await this.usersDatabase.getWhere(
      'email',
      this.post.author_email
    ) as Record<string, FirestoreUser> | null;

    if (!author) {
      return;
    };

    this.authorId = Object.keys(author)[0];
  },

  computed: {
    ...mapGetters(['user']),

    thumbnail () {
      return (this.post && this.post.thumbnail) ? this.post.thumbnail : '';
    },

    title () {
      return (this.post && this.post.title) ? this.post.title : '';
    },

    content () {
      return (this.post && this.post.content) ? this.post.content : '';
    },

    author () {
      return (this.post && this.post.author) ? this.post.author : '';
    },

    authorPhotoURL () {
      return (this.post && this.post.author_photo_url) ? this.post.author_photo_url : '';
    },

    createdAt () {
      if (!this.post) {
        return '';
      };

      const createdAt = this.post.created_at;
      const date = new Date(createdAt);

      const dateString = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      return dateString;
    },

    breakpoint () {
      return this.$vuetify.breakpoint.name;
    },

    viewerIsTheAuthor () {
      if (this.user?.firestoreUser.email === this.post?.author_email) {
        return true;
      };

      return false;
    }
  },

  methods: {
    async handleDeletePost () {
      this.$nuxt.$loading.start();
      
      if (!this.viewerIsTheAuthor || !this.post) {
        return;
      };

      await this.postsService?.deletePostsWhere('id', this.post.id);

      this.$nuxt.$loading.finish();
      this.$router.push('/home');
    }
  },
});
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
  font-size: 3.5em;
  font-weight: 900 !important;
}

.post-content {
  font-size: 19px !important;
  line-height: 38px;

  padding: 20px;

  h1 {
    margin-top: 50px;
  }

  pre {
    white-space: pre-line;
    background-color: rgb(33, 33, 33);
    color: #fff;
  }
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
</style>
