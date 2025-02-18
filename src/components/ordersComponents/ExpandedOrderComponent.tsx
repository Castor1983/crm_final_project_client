import {FC, useState} from "react";
import {useAuthStore} from "../../store/auth.ts";
import {useCommentsStore} from "../../store/comments.ts";
import {Order} from "../../interfaces/order.interface.ts";
import {useOrdersStore} from "../../store/orders.ts";
import {urls} from "../../common/urls.ts";
import {apiAuth} from "../../services/api.ts";

type Props = {
    setIsModalOpen: (open: boolean) => void
    order: Order
}
const ExpandedOrderComponent: FC <Props> = ({setIsModalOpen, order}) => {
    const {manager} = useAuthStore()
    const {comments, comment, setComment, setComments} = useCommentsStore();
    const {setEditOrder}=useOrdersStore()
    const [error, setError] = useState("");


    const handleSubmitComment = async (orderId: number) => {
        if (!comment.trim()) {
            setError("The field must not be empty");
            return;
        }
        try {
            await apiAuth.post(urls.orders.addComment(orderId), {
                body: comment,
            });
            setComment('');
            setError('');
            const response = await apiAuth.get(urls.orders.orderById(orderId))// todo
            setComments(response.data.comments)
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);//todo
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
                <div className="mt-4 p-2 border-t border-gray-300">
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
                                className="bg-[#43a047] text-white px-4 py-2 mt-2 rounded-[5px] hover:bg-green-700"
                            >
                                Submit
                            </button>

                            <button
                                onClick={() => handleOpenModal(order)}
                                className="bg-[#43a047] text-white px-4 py-2 mt-2 rounded-[5px] hover:bg-green-700"
                            >
                                Edit
                            </button>
                        </div>

                    </div>
                )}
            </td>
        </tr>

                    )
}
export default ExpandedOrderComponent;