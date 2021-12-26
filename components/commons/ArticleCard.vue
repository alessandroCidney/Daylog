<template>
  <v-card :width="width" :to="`/posts/${id}`" elevation="2">
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

      <div class="d-flex flex-column align-end justify-start mr-2">
        <strong class="my-0"><small>{{ author }}</small></strong>
        <small>{{ createdAt | formattedPeriod }}</small>
      </div>

      <v-avatar>
        <v-img
          width="20px"
          :src="authorPhotoURL"
        />
      </v-avatar>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

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
  author: string | undefined;
  authorPhotoURL: string | undefined;
  id: string | undefined;
  alreadyLiked: boolean;
  alreadySaved: boolean;
  like: any;
  save: any;
  createdAt: Date | undefined;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  filters: {
    formattedPeriod (date: Date) {
      return moment(date).fromNow();
    }
  },
  
  props: {
    width: { type: [Number, String], default: "100%", required: false },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    imageURL: { type: String, required: false, default: undefined },
    author: { type: String, required: false, default: 'Unknown' },
    authorPhotoURL: { type: String, required: false, default: undefined },
    id: { type: String, required: false, default: undefined },
    alreadyLiked: { type: Boolean, required: false, default: false },
    like: { type: Function, required: false, default: () => {} },
    save: { type: Function, required: false, default: () => {} },
    alreadySaved: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, required: false, default: undefined },
  },

  data: () => ({
    imageLoaded: false
  })
});
</script>
