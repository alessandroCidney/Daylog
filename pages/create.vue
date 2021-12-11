<template>
  <v-container class="mt-10" fluid>
    <v-row class="create-post-header mb-5" align="center" justify="center">
      <v-col md="6" sm="12" cols="12" class="pa-0">
        <DropPhotoZone v-model="thumb" class="create-page-drop-photo-zone" />
      </v-col>

      <v-col align-self="center" md="6" sm="12" cols="12">
        <v-textarea
          v-model="title"
          flat
          solo
          placeholder="Enter a title for your post!"
          class="font-weight-bold article-creation-title-textarea"
          height="150px"
          no-resize
          color="space"
        />
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="editor-and-controls">
      <v-col md="8" sm="10">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreUser } from '@/types/users';
import PostsService, { IPostService } from '@/services/posts';
import Editor from '~/components/pages/create/Editor/index.vue';
import DropPhotoZone from '@/components/utils/DropPhotoZone.vue';

interface Data {
  title: string;
  content: string;
  thumb: File | undefined;
  postsService: IPostService | null;
  loading: boolean;
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
    postsService: null,
    loading: false,
  }),

  created () {
    this.postsService = new PostsService();
  },

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    async save () {
      this.$nuxt.$loading.start();

      if (
        this.title &&
        this.content &&
        this.thumb &&
        this.user?.firestoreUser.username &&
        this.user?.firestoreUser.email
      ) {
        const postKey = await this.postsService?.savePost(
          this.title,
          this.content,
          this.user?.firestoreUser.username,
          this.user?.firestoreUser.email,
          this.user.firestoreUser.profile_photo ? this.user.firestoreUser.profile_photo : '',
          this.thumb || null
        );

        this.loading = false;

        if (!!postKey) {
          this.$router.push(`/posts/${postKey}`);
        };
      };

      this.$nuxt.$loading.finish();
    },
  },
});
</script>

<style lang="scss">
.article-creation-title-textarea {
  font-size: 3.5em !important;
  
  textarea {
    line-height: 3.5rem !important;
  }
}

.create-post-editor {
  border: 3px solid #f0f0f0 !important;
}

.create-page-drop-photo-zone {
  border-left: 0 !important;
  height: 400px !important;
}
</style>
