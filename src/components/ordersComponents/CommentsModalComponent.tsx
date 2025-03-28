import {FC, useState} from "react";
import PaginationComponent from "../paginationComponents/PaginationCOmponent.tsx";
import {buttonClass} from "../../styles/styles.ts";
import {useCommentsStore} from "../../store/comments.ts";

type Props ={
    onClose: () => void
}
const CommentsModalComponent: FC<Props> = ({ onClose }) => {
    const { comments } = useCommentsStore();
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    const totalPages = Math.ceil(comments.length / commentsPerPage);
    const displayedComments = comments
        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        .slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

    return (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-96 shadow-lg">
                {displayedComments.length > 0 ? (
                    <ul className="space-y-2">
                        {displayedComments.map((comment, index) => (
                            <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm">
                                <p className="text-sm text-gray-800">{comment.body}</p>
                                <p className="text-xs text-gray-500">
                                    <strong>{comment.manager_surname}</strong> • {new Date(comment.created).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm">No comments</p>
                )}

                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                <button
                    onClick={onClose}
                    className={buttonClass}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CommentsModalComponent;