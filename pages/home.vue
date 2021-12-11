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
          <v-icon left>
            mdi-plus
          </v-icon>
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
          :already-saved="post.alreadySaved"
          :like="() => like(post.id)"
          :save="() => save(post.id)"
        />
      </v-col>
    </v-row>

    <div v-else-if="!loadingPosts" class="text-center">
      Nenhuma postagem encontrada ;-;
    </div>

    <v-speed-dial
      v-model="speedDial"
      direction="top"
      :top="false"
      :right="true"
      :bottom="true"
      :left="false"
      fixed
    >
      <template v-slot:activator>
        <v-btn fab>
          <v-icon v-if="speedDial" color="space">mdi-close</v-icon>
          <v-icon v-else color="space">mdi-feather</v-icon>
        </v-btn>
      </template>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            to="/create"
            fab
            small
          >
            <v-icon color="space">mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Create a new post</span>
      </v-tooltip>
    </v-speed-dial>
    
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import PostsService, { IPostService } from '@/services/posts';
import Users, { IUsers } from '@/services/users';
import { FirestoreUser } from '@/types/users';
import { TPost, TValidatedPost } from '@/types/posts';
import ArticleCard from '@/components/commons/ArticleCard.vue';

interface Data {
  postsService: IPostService | null;
  usersService: IUsers | null;
  posts: TPost[] | TValidatedPost[];
  loadingPosts: boolean;
  speedDial: boolean;
};

interface Props {};

interface Computed {
  firestoreUser: FirestoreUser | null;
};

interface Methods {
  like: () => Promise<void>;
  save: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  getCurrentFirestoreUser: () => Promise<void>;
};

export default Vue.extend<Data, Props, Computed, Methods>({
  components: {
    ArticleCard
  },
  
  data: () => ({
    postsService: null,
    usersService: null,
    posts: [],
    loadingPosts: true,
    speedDial: false
  }),

  created () {
    this.postsService = new PostsService();
    
    const userId = this.firestoreUser?.id;

    if (userId) {
      this.usersService = new Users(userId);
    };
  },

  async mounted () {
    await this.fetchPosts();
    this.loadingPosts = false;
  },

  computed: {
    ...mapGetters(['firestoreUser']),
  },

  methods: {
    ...mapActions(['getCurrentFirestoreUser']),

    async fetchPosts () {
      const user = this.firestoreUser;

      if (!this.postsService || !user) {
        return;
      };

      const posts = await this.postsService.fetchPosts();

      this.posts = posts.map(post => ({
        ...post,
        alreadyLiked: post.likes &&
          post.likes.findIndex(like => like.author_id === user.id) !== -1,
        alreadySaved: user.savedPosts &&
          user.savedPosts.indexOf(post.id) !== -1
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
    },

    async save (postKey: string) {
      if (!this.usersService || !this.firestoreUser) {
        return;
      };

      const success = await this.usersService.toggleSavedPost(postKey);

      if (success) {
        await this.getCurrentFirestoreUser();
        await this.fetchPosts();
      };
    }
  }
});
</script>
