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
        {{ createdAt }}
        <v-icon color="space">mdi-circle-small</v-icon>
        <nuxt-link
          v-if="postAuthorId"
          :to="`/users/${postAuthorId}`"
          class="text-decoration-none font-weight-bold space--text"
        >
          @{{ author }}
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
          <v-skeleton-loader v-if="!title" type="text" class="post-title" />
          <v-skeleton-loader v-if="!title" type="text" class="post-title" />
          <v-skeleton-loader v-if="!title" type="text" class="post-title" />
          <h1 class="post-title">{{ title }}</h1>

        <div v-if="viewerIsTheAuthor">
          <v-btn icon color="space">
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
    </v-row>

    <v-row align="center" justify="center" class="mt-10">
      <v-col md="8" sm="10" cols="10" class="pa-0 mr-2">
        <v-card flat :class="darkerTheme ? 'base' : 'light'">
          <div
            class="post-content"
            v-html="postContent"
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

    <ArticleInteractionsArea
      v-if="post"
      :post="post"
      :comments="postComments || []"
      :updatePage="fetchPostData"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import { FirestoreUser } from '~/types/users';

import PostData from '@/mixins/OnPostData';

import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';
import ArticleInteractionsArea from '@/components/pages/posts/ArticleInteractionsArea/index.vue';

import PostsService from '~/services/posts';

@Component({
  components: { IconButtonTooltip, ArticleInteractionsArea }
})
export default class PostPage extends Mixins(PostData) {
  id: string = this.$route.params.id;
  postsService = new PostsService();

  async created () {
    await this.fetchPostData();
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
};

/*
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { TPost, TPostComment } from '@/types/posts';
import { FirestoreUser, StoreUser } from '@/types/users';
import PostsService, { IPostService } from '@/services/posts';
import Database, { IDatabase } from '@/services/database';
import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';
import ArticleInteractionsArea from '@/components/pages/posts/ArticleInteractionsArea/index.vue';

interface Data {
  post: TPost | null;
  postsService: IPostService | null;
  usersDatabase: IDatabase | null;
  id: string;
  authorId: string;
  thumbLoaded: boolean;
  comments: TPostComment[];
};

interface Methods {
  handleDeletePost: () => Promise<void>;
  fetchPostData: () => Promise<void>;
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
  darkerTheme: boolean;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    IconButtonTooltip,
    ArticleInteractionsArea
  },

  data: () => ({
    post: null,
    postsService: null,
    usersDatabase: null,
    id: '',
    authorId: '',
    thumbLoaded: false,
    comments: [],
  }),

  async created () {
    this.id = this.$route.params.id;

    await this.fetchPostData();
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
    },

    darkerTheme () {
      return this.$vuetify.theme.dark;
    },
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
    },

    async fetchPostData () {
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
      this.comments = this.post.comments || [];
    }
  },
});
*/
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

.post-content {
  font-size: 19px !important;
  line-height: 38px;

  padding: 20px;

  h1, h2, h3 {
    margin: 16px 0 !important;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
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
