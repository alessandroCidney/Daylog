import Database, { IDatabase } from "../database";
import { TPostComment } from "@/types/posts";
import { generareSuccessMessage, generateErrorMessage } from "@/utils/generateMessage";

export class PostsCommentsService {
  database: IDatabase;
  postId: string;

  constructor (postId: string) {
    this.postId = postId;
    this.database = new Database('posts');
  };

  async like (commentId: string, authorId: string) {
    try {
      const saveChanges = (commentsArr: TPostComment[]) => {
        return this.database.update({ comments: commentsArr }, this.postId);
      };
  
      const comments = await this.database.get(`/${this.postId}/comments`) as TPostComment[];
      const comment = comments.find(comment => comment.id === commentId);
  
      if (!comment) throw new Error('Comment not found');
  
      if (!comment.likes || comment.likes.length === 0) comment.likes = [];
  
      const likes = comment.likes;
      const lastLike = likes.find(like => like.author_id === authorId);
  
      if (lastLike) {
        likes.splice(likes.indexOf(lastLike), 1);
        saveChanges(comments);
        return;
      };
  
      likes.push({
        author_id: authorId,
        created_at: (new Date()).getTime(),
      });
  
      saveChanges(comments);

      return generareSuccessMessage('Comment liked successfully')
    } catch (err) {
      console.log('Error on posts comments service', err);
      return generateErrorMessage((err as Record<string, string>).message)
    }
  };

  async delete (commentId: string, authorId: string) {
    const comments = await this.database.get(`/${this.postId}/comments`) as TPostComment[];
    const comment = comments.find(comment => comment.id === commentId);

    if (comment?.author_id === authorId) {
      comments.splice(comments.indexOf(comment), 1);
      await this.database.update({ comments }, this.postId);
      return generareSuccessMessage('Comment deleted successfully');
    };

    return generateErrorMessage('You is not the author of this comment')
  };
};