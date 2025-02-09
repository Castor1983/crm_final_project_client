import {create} from "zustand/index";
import {CommentsStateInterface} from "../interfaces/commentsState.interface.ts";
import {CommentInterface} from "../interfaces/comment.interface.ts";


export const useCommentsStore = create<CommentsStateInterface>((set) => ({
    comments: [],
    comment:'',
    setComments: (comments:CommentInterface []) => set({ comments }),
    setComment: (comment: string ) => set({ comment }),

}));