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
        @click.prevent="() => {}"
      >
        <v-icon>
          mdi-bookmark-multiple-outline
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
  like: any;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    width: { type: [Number, String], default: "100%", required: false } as PropOptions<number | string>,
    title: { type: String, required: true } as PropOptions<string>,
    description: { type: String, required: false, default: "" } as PropOptions<string>,
    imageURL: { type: String, required: false, default: undefined } as PropOptions<string | undefined>,
    authorPhotoURL: { type: String, required: false, default: undefined } as PropOptions<string | undefined>,
    id: { type: String, required: false, default: undefined } as PropOptions<string | undefined>,
    alreadyLiked: { type: Boolean, required: false, default: false } as PropOptions<boolean>,
    like: { type: Function, required: false, default: () => {} }
  },

  data: () => ({
    imageLoaded: false
  })
});
</script>
