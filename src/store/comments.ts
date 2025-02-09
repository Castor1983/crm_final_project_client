import {create} from "zustand/index";
import {CommentsStateInterface} from "../interfaces/CommentsState.interface.ts";
import {CommentInterface} from "../interfaces/comment.interface.ts";


export const useCommentsStore = create<CommentsStateInterface>((set) => ({
    comments: [],
    setComments: (comments:CommentInterface []) => set({ comments }),

}));