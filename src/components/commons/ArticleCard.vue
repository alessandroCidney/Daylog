<template>
  <v-card flat class="articleCard" width="100%" :to="`/posts/${post.id}`">
    <div class="d-flex mt-8 ml-4">
      <v-avatar>
        <v-img
          :src="currentAuthorProfilePhoto || ''"
          :width="35"
        />
      </v-avatar>

      <div class="d-flex align-start justify-center flex-column ml-4">
        <div :class="{ 'black--text': !theme.isDark }">@{{ post.author }}</div>
        <div class="articleCardCreatedAt">{{ post.created_at | formattedPeriod }}</div>
      </div>
    </div>

    <v-card-title class="articleCardTitle">{{ post.title }}</v-card-title>

    <v-card-text class="articleCardText">{{ post.content | formattedContent }}</v-card-text>

    <v-img
      v-if="post.thumbnail"
      :src="post.thumbnail || ''"
      width="100%"
      :height="300"
    />

    <v-card-actions>
      <v-btn
        icon
        color="space"
        @click.prevent="like"
      >
        <v-icon>
          {{ post.alreadyLiked ? 'mdi-heart' : 'mdi-heart-outline' }}
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
          {{ post.alreadySaved ? 'mdi-bookmark-multiple' : 'mdi-bookmark-multiple-outline' }}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator';

import Database from '@/services/database';

import { TValidatedPost } from '@/types/posts';
import { FirestoreUser } from '@/types/users';

import moment from 'moment';

type TInjectedTheme = { isDark: boolean; };

@Component({
  filters: {
    formattedPeriod (time: number) {
      return moment(new Date(time)).fromNow();
    },
    formattedContent (content: string) {
      return content.slice(0, 400).replace(/<.+?>/g, ' ')
    }
  }
})
export default class ArticleCardComponent extends Vue {
  usersDatabase = new Database('users');
  currentAuthorProfilePhoto: string | null = null;

  @Prop(Object) readonly post!: TValidatedPost;
  @Prop(Function) readonly like!: (postKey: string) => Promise<void>;
  @Prop(Function) readonly save!: (postKey: string) => Promise<void>;

  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;

  async mounted () {
    const response = await this.usersDatabase.getWhere('email', this.post.author_email) as Record<string, FirestoreUser> | null | undefined;
    
    if (!response) {
      this.currentAuthorProfilePhoto = null;
      return;
    };

    this.currentAuthorProfilePhoto = Object.values(response)[0].profile_photo || null;
  };
};
</script>

<style lang="scss" scoped>
.articleCard {
  border: 1px solid #F1F1F1 !important;
}

.articleCardTitle {
  font-family: 'Montserrat Alternates';
  font-weight: 900;
  letter-spacing: -0.6px;
  font-size: 24px;
  margin-top: 22px;
}

.articleCardCreatedAt {
  font-size: 14px;
  color: #C9C9C9;
}

.articleCardText {
  color: #BDBDBD !important;
  font-size: 16px !important;
  letter-spacing: -0.6px !important;
  word-break: normal !important;
  overflow-wrap: anywhere !important;
}
</style>