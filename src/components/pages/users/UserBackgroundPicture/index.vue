<template>
  <div>
    <v-img
      :src="src || require('@/assets/images/b-background.jpg')"
      alt="Profile background photo"
      class="profile-background-photo"
      :height="loaded ? 250 : 0"
      @load="loaded = true"
    ></v-img>

    <v-skeleton-loader
      v-if="!loaded"
      type="image"
      class="profile-background-photo"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BackgroundPictureComponent extends Vue {
  @Prop(String) readonly src!: string;

  loaded = false;
}
</script>

<style lang="scss" scoped>
.profile-background-photo {
  border-bottom: 1px solid rgb(240, 240, 240);

  .v-skeleton-loader__image {
    height: 250px !important;
  }
}
</style>