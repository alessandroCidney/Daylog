<template>
  <v-container>
    <v-row align="center" justify="center" >
      <v-col sm="10" md="8">
        <v-btn
          block
          depressed
          color="space"
          class="white--text"
          to="/create"
        >
          Create a new post
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="posts.length > 0" align="center" justify="center" class="mt-5">
      <v-col
        v-for="(post, index) in posts"
        :key="`home-post-${index}`"
        md="8"
        sm="10"
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
    </v-row>

    <div v-else-if="!loadingPosts" class="text-center">
      Nenhuma postagem encontrada ;-;
    </div>

    <v-btn fab fixed right bottom to="/create">
      <v-icon color="space">mdi-plus</v-icon>
    </v-btn>
    
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import PostsService, { IPostService } from '@/services/posts';
import { FirestoreUser, StoreUser } from '@/types/users';
import { TPost } from '@/types/posts';
import ArticleCard from '@/components/commons/ArticleCard.vue';

interface Data {
  postsService: IPostService | null;
  posts: TPost[];
  loadingPosts: boolean;
};

interface Props {};

interface Computed {
  firestoreUser: FirestoreUser | null;
};

interface Methods {
  like: () => Promise<void>;
  fetchPosts: () => Promise<void>;
};

export default Vue.extend<Data, Props, Computed, Methods>({
  components: {
    ArticleCard
  },
  
  data: () => ({
    postsService: null,
    posts: [],
    loadingPosts: true
  }),

  created () {
    this.postsService = new PostsService();
  },

  async mounted () {
    await this.fetchPosts();
    this.loadingPosts = false;
  },

  computed: {
    ...mapGetters(['firestoreUser']),
  },

  methods: {
    async fetchPosts () {
      const user = this.firestoreUser;

      if (!this.postsService || !user) {
        return;
      };

      const posts = await this.postsService.fetchPosts();

      this.posts = posts.map(post => ({
        ...post,
        alreadyLiked: post.likes &&
          post.likes.findIndex(like => like.author_id === user.id) !== -1
      }));
    },

    async like (postKey: string) {
      if (!this.postsService || !this.firestoreUser) {
        return;
      };

      const success = await this.postsService.toggleLike(postKey, this.firestoreUser.id);
      
      if (success) {
        await this.fetchPosts();
      };
    }
  }
});
</script>
