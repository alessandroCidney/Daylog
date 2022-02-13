<template>
  <v-container class="light" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-row align="center" justify="center">
          <v-col cols="10" align="center" justify="center">
            
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="editor-and-controls">
          <v-col md="11" sm="11" class="pa-0">
            <div class="d-flex">
              <v-spacer />
              
            </div>
            <v-card min-height="500px" flat class="create-post-editor pa-0 rounded-xl overflow-hidden">
              <Editor v-model="content">
                <template v-slot:menuRightItems>
                  <IconButtonTooltip
                    icon="mdi-content-save-outline"
                    text="Save post"
                    :action="save"
                  />

                  <IconButtonTooltip
                    icon="mdi-delete-outline"
                    text="Discard post"
                    :action="() => $router.push('/home')"
                  />
                </template>

                <template v-slot:centerItems>
                  <v-row align="center" justify="center">
                    <v-col cols="12" class="mt-10 py-0">
                      <v-textarea
                        v-model="title"
                        flat
                        solo
                        placeholder="Enter a title for your post!"
                        class="font-weight-bold article-creation-title-textarea"
                        auto-grow
                        rows="3"
                        color="space"
                      />
                    </v-col>
                    
                    <v-col cols="12">
                      <DropPhotoZone
                        v-model="thumb"
                        :defaultImage="postThumbnail"
                        :class="{
                          'create-page-drop-photo-zone': true,
                          'bigger-drop-photo-zone': !!thumb
                        }"
                      />
                    </v-col>
                  </v-row>
                </template>
              </Editor>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import PostsService from '@/services/posts';
import { WritterService } from '@/services/writter';

import OnFirestoreUserData from '@/mixins/OnFirestoreUserData';
import PostData from '@/mixins/OnPostData';

import Editor from '@/components/pages/create/Editor/index.vue';
import DropPhotoZone from '@/components/utils/DropPhotoZone.vue';
import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';

@Component({
  components: { Editor, DropPhotoZone, IconButtonTooltip }
})
export default class CreatePage extends Mixins(OnFirestoreUserData, PostData) {
  id: string = this.$route.params.id;
  postsService = new PostsService();
  writterService = new WritterService();
  title = '';
  content = '';
  thumb: File | null = null;

  async created () {
    await this.fetchPostData();
  };

  async save () {
    this.$nuxt.$loading.start();

    if (
      this.title &&
      this.content &&
      this.thumb &&
      this.firestoreUserUsername &&
      this.firestoreUserEmail
    ) {
      const postKey = await this.postsService.savePost(
        this.title,
        this.content,
        this.firestoreUserUsername,
        this.firestoreUserEmail,
        this.firestoreUserProfilePhoto,
        this.thumb || null
      );

      if (!!postKey) this.$router.push(`/posts/${postKey}`);
    };

    this.$nuxt.$loading.finish();
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
    this.content = this.postContent || '';
    this.title = this.postTitle || '';
  };
};
</script>

<style lang="scss">
.article-creation-title-textarea {
  font-size: 80px !important;
  
  textarea {
    line-height: 5rem !important;
  }
}

.create-page-drop-photo-zone {
  height: 100px !important;
  border: 2px solid #f0f0f0 !important;

  transition: all .5s ease;
}

.create-page-drop-photo-zone:hover {
  border: 2px dashed #f0f0f0 !important;
}

.bigger-drop-photo-zone {
  height: 500px !important;
}
</style>
