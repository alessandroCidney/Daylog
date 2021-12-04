<template>
  <v-container class="mt-10 create-post-container">
    <v-row class="create-post-header mb-5">
      <v-col md="6" sm="12">
        <DropPhotoZone v-model="thumb" />
      </v-col>

      <v-col align-self="center" md="6" sm="12">
        <v-textarea
          v-model="title"
          flat
          solo
          placeholder="Digite o título do seu novo artigo!"
          class="font-weight-bold article-creation-title-textarea"
          height="150px"
          no-resize
          color="space"
        />
      </v-col>
    </v-row>

    <div class="d-flex">
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            icon
            color="space"
            @click="save"
          >
            <v-icon size="24">
              mdi-content-save
            </v-icon>
          </v-btn>
        </template>
        <span>Save post</span>
      </v-tooltip>
    </div>

    <v-card min-height="500px" flat class="create-post-editor pa-0">
      <Editor v-model="content" />
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreUser } from '@/types/users';
import PostsService, { IPostService } from '@/services/posts';
import Editor from '@/components/commons/Editor.vue';
import DropPhotoZone from '@/components/utils/DropPhotoZone.vue';

interface Data {
  title: string;
  content: string;
  thumb: File | undefined;
  postsService: IPostService | null;
};

interface Methods {
  save: () => Promise<void>;
};

interface Props {};

interface Computed {
  user: StoreUser | null;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {
    Editor,
    DropPhotoZone
  },

  data: () => ({
    title: '',
    content: '',
    thumb: undefined,
    postsService: null
  }),

  created () {
    this.postsService = new PostsService();
  },

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    async save () {
      if (
        this.title &&
        this.content &&
        this.thumb &&
        this.user?.authUser.displayName &&
        this.user?.authUser.email
      ) {
        await this.postsService?.savePost(
          this.title,
          this.content,
          this.user?.authUser.displayName,
          this.user?.authUser.email,
          this.user.authUser.photoURL ? this.user.authUser.photoURL : '',
          this.thumb || null
        );
      };
    },
  },
});
</script>

<style lang="scss">
.article-creation-title-textarea {
  font-size: 2.5rem !important;
  
  textarea {
    line-height: 2.8rem !important;
  }
}

.create-post-container {
  width: 70%;
}

.create-post-editor {
  border: 3px solid #f0f0f0 !important;
}

.create-post-header {
  height: 280px;
}
</style>
