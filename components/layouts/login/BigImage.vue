<template>
  <v-img
    :src="imageURL"
    class="bigImage"
    gradient="to top right, rgba(33, 33, 33, .6), rgba(33, 33, 33, .6)"
  >
    <h3 class="passero-one white--text pt-10 ml-10" v-html="title" />
  </v-img>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {};
interface Methods {};
interface Computed {};

interface Props {
  title: string;
  imageURL: string;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    title: { type: String, required: false, default: '' },
    imageURL: { type: String, required: false, default: '' }
  }
});
</script>

<style lang="scss" scoped>
.bigImage {
  width: 100% !important;
  height: 100% !important;
}
</style>
