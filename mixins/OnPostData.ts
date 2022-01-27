import { Vue, Component } from 'vue-property-decorator';
import { TPost } from '~/types/posts';

@Component
export default class PostData extends Vue {
  post: TPost | null = null;

  get postId () {
    return (this.post && this.post.id) ? this.post.id : '';
  };

  get postAuthor () {
    return (this.post && this.post.author) ? this.post.author : '';
  };

  get postAuthorEmail () {
    return (this.post && this.post.author_email) ? this.post.author_email : '';
  };

  get postAuthorPhotoURL () {
    return (this.post && this.post.author_photo_url) ? this.post.author_photo_url : '';
  };

  get postContent () {
    return (this.post && this.post.content) ? this.post.content : '';
  };

  get postTitle () {
    return (this.post && this.post.title) ? this.post.title : '';
  };

  get postFormattedTitle () {
    return (this.post && this.post.formatted_title) ? this.post.formatted_title : '';
  };

  get postThumbnail () {
    return (this.post && this.post.thumbnail) ? this.post.thumbnail : '';
  };

  get postCreatedAt () {
    return (this.post && this.post.created_at) ? this.post.created_at : undefined;
  };

  get postLikes () {
    return (this.post && this.post.likes) ? this.post.likes : [];
  };

  get postComments () {
    return (this.post && this.post.comments) ? this.post.comments : [];
  };
};
