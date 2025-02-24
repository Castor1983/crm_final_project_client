import {FC, useEffect, useState} from "react";
import {useAuthStore} from "../../store/auth.ts";
import {Order} from "../../interfaces/order.interface.ts";
import {useOrdersStore} from "../../store/orders.ts";
import {CommentInterface} from "../../interfaces/comment.interface.ts";
import CommentsModalComponent from "./CommentsModalComponent.tsx";
import {fetchAddComment, fetchComments} from "../../requests/requests.ts";
import {buttonClass} from "../../styles/styles.ts";

type Props = {
    setIsModalOpen: (open: boolean) => void
    order: Order
}

const ExpandedOrderComponent: FC <Props> = ({setIsModalOpen, order}) => {
    const {manager} = useAuthStore()
    const [comments,  setComments] = useState<CommentInterface[]>([]);
    const [comment, setComment] = useState('');
    const {setEditOrder}=useOrdersStore()
    const [error, setError] = useState("");
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);


    useEffect(() => {
        fetchComments(order.id, setComments)
    }, [comment]);



    const handleSubmitComment = async (orderId: number) => {
        if (!comment.trim()) {
            setError("The field must not be empty");
            return;
        }
        try {
            await fetchAddComment(orderId, comment)
            setComment('');
            setError('');
        } catch (error) {
            console.error('Error sending comment:', error);
        }
    };

    const handleOpenModal = (order: Order) => {
        setEditOrder(order);
        setIsModalOpen(true);
    };

    return (<tr>
            <td colSpan={17} className="p-4 bg-gray-100">
                <p><strong>Message:</strong> {order.msg || 'None'}</p>
                <p><strong>UTM:</strong> {order.utm || 'None'}</p>
                <div className="mt-4 p-2 border-t border-gray-300" onClick={() => setIsCommentsModalOpen(true)}>
                    {comments && comments.length > 0 ? (
                        <ul className="space-y-2">
                            {[...comments]
                                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                                .slice(0, 3).map((comment, index) => (
                                <li key={index} className="p-2 bg-white rounded-md shadow-sm">
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
                </div>
                {(!order.manager || order.manager === manager?.surname) && (
                    <div className='flex-col'>
                        <div className="flex flex-col relative">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                    setError("");
                                }}
                                placeholder="Comment"
                                className=" p-2 w-full rounded-[5px] bg-gray-200 focus:outline-none"
                            />
                            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => {
                                    if (order.id) {
                                        handleSubmitComment(order.id)
                                    }
                                }}
                                className={buttonClass}
                            >
                                Submit
                            </button>

                            <button
                                onClick={() => handleOpenModal(order)}
                                className={buttonClass}
                            >
                                Edit
                            </button>
                        </div>

                    </div>
                )}
                {isCommentsModalOpen && (
                    <CommentsModalComponent comments={comments} onClose={() => setIsCommentsModalOpen(false)} />
                )}
            </td>
        </tr>

    )
}
export default ExpandedOrderComponent;