import { Vue, Component, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

import Database from '~/services/database';

import { TPost } from '~/types/posts';
import { FirestoreUser } from '~/types/users';

type TFetchAuthorResponse = Record<string, FirestoreUser>;

@Component
export default class PostData extends Vue {
  post: TPost | null = null;
  author: FirestoreUser | null = null;
  postAuthorId: string | null = null;
  usersDatabase = new Database('users');

  @Getter firestoreUser!: FirestoreUser | undefined;

  @Watch('post')
  async onPostChanged (post: TPost) {
    if (!!post) {
      const response: TFetchAuthorResponse = await this.usersDatabase.getWhere('email', this.postAuthorEmail);

      if (!response) return;

      this.postAuthorId = Object.keys(response)[0];

      const author = Object.values(response)[0];

      if (!author) return;

      this.author = author;
    };
  };

  get postId () {
    return this.post && this.post.id;
  };

  get postAuthor () {
    return this.post && this.post.author;
  };

  get postAuthorEmail () {
    return this.post && this.post.author_email;
  };

  get postAuthorPhotoURL () {
    return this.author && this.author.profile_photo;
  };

  get postContent () {
    return this.post && this.post.content;
  };

  get postTitle () {
    return this.post && this.post.title;
  };

  get postFormattedTitle () {
    return this.post && this.post.formatted_title;
  };

  get postThumbnail () {
    return this.post && this.post.thumbnail;
  };

  get postCreatedAt () {
    return this.post && this.post.created_at;
  };

  get postUpdatedAt () {
    return this.post && this.post.updated_at;
  };

  get postLikes () {
    return this.post && this.post.likes;
  };

  get postComments () {
    return this.post && this.post.comments;
  };

  get viewerIsTheAuthor () {
    if (this.firestoreUser?.email === this.post?.author_email) {
      return true;
    };

    return false;
  };
};
