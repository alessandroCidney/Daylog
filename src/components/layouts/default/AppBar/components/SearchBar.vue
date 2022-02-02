<template>
  <div class="d-flex">
    <v-btn icon @click="showAutocomplete = !showAutocomplete">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-slide-x-reverse-transition hide-on-leave>
      <v-autocomplete
        v-if="showAutocomplete"
        v-model="selectedPost"
        class="appBarSearch align-center"
        dense
        solo
        color="space"
        placeholder="Search a post"
        hide-details
        hide-no-data
        :items="posts"
        item-text="title"
        item-value="id"
        :loading="loading"
        :search-input.sync="search"
        @input="redirectToPostPage"
      >
        <template slot="append">
          <v-icon />
        </template>

        <template v-slot:item="data">
          <v-list-item-icon>
            <v-icon>mdi-application-edit</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ data.item.title }}
            </v-list-item-title>

            <v-list-item-subtitle>
              Created by @{{ data.item.author }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import PostsService from '@/services/posts';

import { TPost } from '@/types/posts';

@Component({
  filters: {
    withoutHTMLTags (str: string) {
      return str.replace(/<.+?>/g, ' ');
    }
  }
})
export default class SearchBar extends Vue {
  postsService = new PostsService();
  posts: TPost[] = [];
  selectedPost: TPost | null = null;
  loading = false;
  showAutocomplete = false;

  search = '';

  @Watch('search')
  async onSearchChanged (searchString: string) {
    if (!this.search) return;

    this.loading = true;

    this.posts = await this.postsService.searchPosts(searchString);

    this.loading = false;
  };

  redirectToPostPage () {
    if (this.selectedPost) {
      this.$router.push(`/posts/${this.selectedPost}`);
    };
  };
};
</script>

<style lang="scss" scoped>
.descriptionOverflow {
  width: 100px !important;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>

<style lang="scss">
.appBarSearch {
  max-width: 417px;

  .v-input__slot {
    box-shadow: none !important;
  }
}
</style>