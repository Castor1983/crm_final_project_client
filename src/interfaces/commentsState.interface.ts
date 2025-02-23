import { CommentInterface } from './comment.interface.ts';

export interface CommentsStateInterface {
  comments: CommentInterface[];
  comment: string;
  setComments: (comments: CommentInterface[]) => void;
  setComment: (comment: string) => void;
}
