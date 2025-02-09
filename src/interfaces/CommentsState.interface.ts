import {CommentInterface} from "./comment.interface.ts";

export interface CommentsStateInterface {
    comments: CommentInterface [],
    setComments: (comments: CommentInterface[]) => void
}