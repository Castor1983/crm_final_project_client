import {FC, useState} from "react";
import {useAuthStore} from "../../store/auth.ts";
import axios from "axios";
import {useCommentsStore} from "../../store/comments.ts";
import {Order} from "../../interfaces/order.interface.ts";
import {useOrdersStore} from "../../store/orders.ts";

type Props = {
    setIsModalOpen: (open: boolean) => void
    order: Order
}
const ExpandedOrderComponent: FC <Props> = ({setIsModalOpen, order}) => {
    const {manager} = useAuthStore()
    const [comment, setComment] = useState('');
    const comments = useCommentsStore.getState().comments
    const accessToken = useAuthStore.getState().accessToken
    const {setEditOrder}=useOrdersStore()

    const handleSubmitComment = async (orderId: number) => {
        try {
            await axios.post(`http://localhost:3001/api/orders/addComment/${orderId}`, {
                body: comment,
            }, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setComment('');
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);
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
                            {comments.map((comment, index) => (
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
                    <div>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Comment"
                            className=" p-2 w-full rounded-[5px] bg-white"
                        />
                        <button
                            onClick={() => {
                                if (order.id) {
                                    handleSubmitComment(order.id)
                                }
                            }}
                            className="bg-[#43a047] text-white px-4 py-2 mt-2 rounded-[5px]"
                        >
                            Submit
                        </button>
                        <div>
                            <button
                                onClick={() => handleOpenModal(order)}
                                className="bg-[#43a047] text-white px-4 py-2 mt-2 rounded-[5px]"
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