<template>
  <v-row align="center" justify="center" class="mt-16">
      <v-col cols="12" class="d-flex align-center justify-center">
        <IconButtonTooltip
          icon="mdi-heart-outline"
          text="Like"
          size="30"
          :action="() => {}"
        />

        <IconButtonTooltip
          icon="mdi-comment-outline"
          text="Comment"
          size="30"
          :action="toggleTextarea"
        />

        <IconButtonTooltip
          icon="mdi-bookmark-outline"
          text="Save"
          size="30"
          :action="() => {}"
        />
      </v-col>

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
        
        <v-list two-line :class="`width100 ${darkerTheme ? 'base' : 'light'}`">
          <div v-for="(comment, index) in viewComments" :key="`${postId}-comment-${index}`" :class="darkerTheme ? 'base' : 'light'">
            <v-list-item>
              <v-list-item-avatar class="align-self-start">
                <v-avatar width="40px" height="40px">
                  <v-img
                    :src="comment.authorPhotoURL || require('@/assets/images/profile/user.jpg')"
                    width="150px"
                  />
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content class="maxWidth100 commentContent">
                <v-list-item-title class="mb-0 pb-0">@{{ comment.authorUsername }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ comment.content }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>

                <v-list-item-action-text>
                  {{ comment.created_at | dateDiff }}
                </v-list-item-action-text>

                <div>
                  <v-btn icon small>
                    <v-icon>mdi-heart-outline</v-icon>
                  </v-btn>

                  <v-btn icon small>
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </div>

              </v-list-item-action>
            </v-list-item>

            <v-divider inset />
          </div>
        </v-list>

      </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { FirestoreUser } from '@/types/users';
import PostsService, { IPostService } from '@/services/posts';
import Database, { IDatabase } from '@/services/database';
import IconButtonTooltip from '@/components/commons/IconButtonTooltip.vue';
import { TPostComment } from '@/types/posts';
import moment from 'moment';

type ViewPostComment = TPostComment & {
  authorUsername: string;
  authorPhotoURL: string;
};

interface Data {
  showCommentMainTextarea: boolean;
  postsService: IPostService | null;
  usersDatabase: IDatabase | null;
  commentText: string;
  viewComments: ViewPostComment[];
};

interface Methods {
  toggleTextarea: () => void;
  sendComment: () => Promise<void>;
  fetchData: () => Promise<void>;
};

interface Computed {
  firestoreUser: FirestoreUser | null;
  darkerTheme: boolean;
};

interface Props {
  postId: string;
  comments: TPostComment[];
  updatePage: () => any;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  filters: {
    dateDiff (time: string) {
      return moment(new Date(time)).fromNow();
    }
  },

  components: {
    IconButtonTooltip
  },

  props: {
    postId: { type: String, required: true },
    comments: { type: Array, required: false, default: () => [] },
    updatePage: { type: Function, required: false, default: () => {} },
  },

  data: () => ({
    showCommentMainTextarea: false,
    postsService: null,
    commentText: '',
    viewComments: [],
    usersDatabase: null,
  }),

  watch: {
    comments () {
      this.fetchData();
    }
  },

  async mounted () {
    this.postsService = new PostsService();
    this.usersDatabase = new Database('users');
  },

  computed: {
    ...mapGetters(['firestoreUser']),

    darkerTheme () {
      return this.$vuetify.theme.dark;
    },
  },

  methods: {
    toggleTextarea () {
      this.showCommentMainTextarea = !this.showCommentMainTextarea;
    },

    async sendComment () {
      if (!this.firestoreUser || !this.postsService) {
        return;
      };

      await this.postsService.sendComment(
        this.postId,
        {
          created_at: (new Date()).getTime(),
          content: this.commentText,
          author_id: this.firestoreUser.id,
          likes: []
        }
      );

      await this.updatePage();
    },

    async fetchData () {
      const usersDB = this.usersDatabase;

      if (!usersDB) {
        return;
      };

      const formattedComments: (ViewPostComment | undefined)[] = await Promise.all(
        this.comments.map(async (comment) => {
        const authorData: FirestoreUser | null | undefined  = await usersDB.get(comment.author_id);

        if (!authorData) {
          return undefined;
        };

        return ({
          ...comment,
          authorUsername: authorData.username,
          authorPhotoURL: authorData.profile_photo
        });
      }));

      this.viewComments = formattedComments.filter(
        formattedComment => !!formattedComment
      ) as ViewPostComment[];
    }
  }
});
</script>
