<template>
  <v-row align="center" justify="center" class="mt-16">
      <PostActions
        v-if="post"
        :post="post"
        :update-page="updatePage"
        :toggle-textarea="toggleTextarea"
      />

      <v-slide-y-transition hide-on-leave>
        <v-col
          v-if="showCommentMainTextarea"
          cols="12"
          class="d-flex align-center justify-center flex-column"
        >
          <div class="commentsFormArea">
            <v-textarea
              v-model="commentText"
              label="Comente algo!"
              color="space"
              auto-grow
              outlined
              hide-details
              class="mb-2"
            />
          </div>

          <div class="commentsFormArea d-flex">
            <v-spacer />
            
            <v-btn
              plain
              color="space"
              class="mr-2"
              text
              @click="toggleTextarea"
            >
              Discard
            </v-btn>
            
            <v-btn
              color="space"
              class="white--text"
              depressed
              @click="sendComment"
            >
              Send
            </v-btn>
          </div>
        </v-col>
      </v-slide-y-transition>

      <v-col md="5" sm="10" cols="10" class="d-flex align-center justify-center">
        
        <v-list two-line :class="`width100 ${theme.isDark ? 'base' : 'light'}`">
          <Comment
            v-for="(comment, index) in viewComments"
            :key="`${postId}-comment-${index}`"
            :comment="comment"
            :darker-theme="theme.isDark"
          />
        </v-list>

      </v-col>
    </v-row>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Watch, Inject } from 'vue-property-decorator';

import PostsService from '@/services/posts';
import Database from '@/services/database';

import OnFirestoreUserData from '~/mixins/OnFirestoreUserData';

import Comment from '../Comment.vue';
import PostActions from '../PostActions.vue';

import { TPost, TPostComment } from '@/types/posts';
import { FirestoreUser } from '@/types/users';

import moment from 'moment';

type TInjectedTheme = { isDark: boolean; };

type ViewPostComment = TPostComment & {
  authorUsername: string;
  authorPhotoURL: string;
};

@Component({
  components: { Comment, PostActions },
  filters: {
    dateDiff (time: string) {
      return moment(new Date(time)).fromNow();
    }
  }
})
export default class ArticleInteractionsAreaComponent extends Mixins(OnFirestoreUserData) {
  showCommentMainTextarea = false;
  postsService = new PostsService();
  usersDatabase = new Database('users');
  commentText = '';
  viewComments: ViewPostComment[] = [];

  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;

  @Prop(Object) readonly post!: TPost;
  @Prop({ type: Array, default: () => [] }) readonly comments!: TPostComment[];
  @Prop({ type: Function, default: () => {} }) readonly updatePage!: () => Promise<void>;

  @Watch('comments')
  onCommentsChanged () {
    this.fetchData();
  };

  async mounted () {
    if (this.comments) {
      await this.fetchData();
    };
  };

  get postId () {
    return this.post.id;
  };

  toggleTextarea () {
    this.showCommentMainTextarea = !this.showCommentMainTextarea;
  };

  async sendComment () {
    if (!this.firestoreUser) return;

    await this.postsService.sendComment(
      this.postId,
      {
        created_at: (new Date()).getTime(),
        content: this.commentText,
        author_id: this.firestoreUserId,
        likes: []
      }
    );

    await this.updatePage();
  };

  async fetchData () {
    const fetchCommentData = async (comment: TPostComment): Promise<ViewPostComment | undefined> => {
      const authorData: FirestoreUser | null | undefined  = await this.usersDatabase.get(comment.author_id);

      if (!authorData) return undefined;

      return ({
        ...comment,
        authorUsername: authorData.username,
        authorPhotoURL: authorData.profile_photo
      });
    };

    const formattedComments: (ViewPostComment | undefined)[] = await Promise.all(
      this.comments.map((comment) => fetchCommentData(comment))
    );

    this.viewComments = formattedComments.filter(comment => !!comment) as ViewPostComment[];
  };
};
</script>
