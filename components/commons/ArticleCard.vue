<template>
  <v-card :width="width" elevation="1" :to="`/posts/${id}`">
    <v-img
      :src="imageURL"
      :alt="`Imagem do post ${title}`"
      :max-height="imageLoaded ? '216px' : '0'"
      @load="imageLoaded = true"
    />

    <v-skeleton-loader
      v-if="!imageLoaded"
      type="image"
      max-height="216px"
    />

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-text>
      {{ description }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        icon
        color="space"
        @click.prevent="like"
      >
        <v-icon>
          {{ alreadyLiked ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>

      <v-btn
        icon
        color="space"
        @click.prevent="() => {}"
      >
        <v-icon>
          mdi-comment-multiple-outline
        </v-icon>
      </v-btn>

      <v-btn
        icon
        color="space"
        @click.prevent="save"
      >
        <v-icon>
          {{ alreadySaved ? 'mdi-bookmark-multiple' : 'mdi-bookmark-multiple-outline' }}
        </v-icon>
      </v-btn>

      <v-spacer />

      <v-avatar>
        <v-img
          width="39px"
          :src="authorPhotoURL"
        />
      </v-avatar>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';

interface Data {
  imageLoaded: boolean;
};

interface Methods {};
interface Computed {};

interface Props {
  width: number | string;
  title: string;
  description: string;
  imageURL: string | undefined;
  authorPhotoURL: string | undefined;
  id: string | undefined;
  alreadyLiked: boolean;
  alreadySaved: boolean;
  like: any;
  save: any;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    width: { type: [Number, String], default: "100%", required: false },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    imageURL: { type: String, required: false, default: undefined },
    authorPhotoURL: { type: String, required: false, default: undefined },
    id: { type: String, required: false, default: undefined },
    alreadyLiked: { type: Boolean, required: false, default: false },
    like: { type: Function, required: false, default: () => {} },
    save: { type: Function, required: false, default: () => {} },
    alreadySaved: { type: Boolean, required: false, default: false },
  },

  data: () => ({
    imageLoaded: false
  })
});
</script>
