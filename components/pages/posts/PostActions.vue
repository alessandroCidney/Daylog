<template>
  <v-col cols="12" class="d-flex align-center justify-center">
    <IconButtonTooltip
      :icon="postLiked ? 'mdi-heart' : 'mdi-heart-outline'"
      text="Like"
      size="30"
      :action="toggleLike"
    />

    <IconButtonTooltip
      icon="mdi-comment-outline"
      text="Comment"
      size="30"
      :action="toggleTextarea"
    />

    <IconButtonTooltip
      icon="mdi-bookmark-outline"
      text="Save"
      size="30"
      :action="() => {}"
    />
  </v-col>
</template>

<script lang="ts">
import Vue, { VueConstructor, PropOptions } from 'vue';

import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';
import PostsService, { IPostService } from '~/services/posts';
import FirestoreUserData from '~/mixins/FirestoreUserData';
import { TPost } from '~/types/posts';

interface Data {
  postsService: IPostService | null;
};

interface Methods {};

interface Computed {
  postLiked: boolean;
};

interface Props {
  post: TPost;
  updatePage: () => Promise<void>;
};

export default (
  Vue as VueConstructor<
    Vue & InstanceType<
      typeof FirestoreUserData
    >
  >
).extend<Data, Methods, Computed, Props>({
  mixins: [FirestoreUserData],

  components: {
    IconButtonTooltip,
  },

  props: {
    post: { type: Object, required: true },
    updatePage: { type: Function, required: true },
  },

  data () {
    return {
      postsService: null,
    }
  },

  created () {
    this.postsService = new PostsService();
  },

  computed: {
    postLiked () {
      if (!this.post.likes) return false;

      return this.post.likes.findIndex(like => like.author_id === this.firestoreUserId) !== -1;
    }
  },

  methods: {
    async toggleLike () {
      if (!this.postsService) return;

      const success = await this.postsService.toggleLike(this.post.id, this.firestoreUserId);

      if (success) {
        await this.updatePage();
      };
    }
  }

});
</script>