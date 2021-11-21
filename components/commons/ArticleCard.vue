<template>
  <v-card :width="width" elevation="1" :to="to">
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
    to: { type: String, required: false, default: "#" },
  }, 
})
</script>
