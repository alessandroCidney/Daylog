<template>
  <v-card :width="width" elevation="1" :to="`posts/${id}`">
    <v-img
      v-if="imageURL"
      :src="imageURL"
      :alt="`Imagem do post ${title}`"
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
        @click.prevent="() => {}"
      >
        <v-icon>
          mdi-heart
        </v-icon>
      </v-btn>

      <v-btn
        icon
        color="space"
        @click.prevent="() => {}"
      >
        <v-icon>
          mdi-comment-multiple
        </v-icon>
      </v-btn>

      <v-btn
        icon
        color="space"
        @click.prevent="() => {}"
      >
        <v-icon>
          mdi-bookmark-multiple
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
import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  props: {
    width: { type: [Number, String], default: "100%", required: false } as PropOptions<number | string>,
    title: { type: String, required: true } as PropOptions<string>,
    description: { type: String, required: false, default: "" } as PropOptions<string>,
    imageURL: { type: String, required: false, default: undefined } as PropOptions<string | undefined>,
    authorPhotoURL: { type: String, required: false, default: undefined } as PropOptions<string | undefined>,
    id: { type: String, required: false, default: undefined },
  }, 
})
</script>
