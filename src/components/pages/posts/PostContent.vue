<template>
  <v-row align="center" justify="center" class="mt-10">
    <v-col md="8" sm="10" cols="10" class="pa-0 mr-2">
      <v-card flat :class="theme.isDark ? 'base' : 'light'">
        <div
          class="postContent"
          v-html="content"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop } from 'vue-property-decorator';

type TInjectedTheme = { isDark: boolean; };

@Component
export default class PostContentComponent extends Vue {
  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;
  @Prop(String) readonly content!: string;
};
</script>

<style lang="scss">
.postContent {
  font-size: 19px !important;
  line-height: 38px;

  padding: 20px;

  h1, h2, h3 {
    margin: 50px 0 16px 0 !important;
  }

  pre {
    background: #0D0D0D;
    color: #00faff;
    font-family: 'Fira Code', monospace !important;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      background: #0D0D0D !important;
      color: inherit;
      padding: 0;
      font-size: 1rem;
      font-family: 'Fira Code', monospace !important;
    }
  }
}
</style>
