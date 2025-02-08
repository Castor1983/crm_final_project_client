import {FC, useEffect, useState} from "react";
import {useOrdersStore} from "../../store/orders.ts";
import axios from "axios";
import {useAuthStore} from "../../store/auth.ts";
import {usePaginationStore} from "../../store/pagination.ts";
import PaginationComponent from "../paginationComponents/PaginationCOmponent.tsx";
import {useSearchParams} from "react-router-dom";
import {useSortConfigStore} from "../../store/sortConfig.ts";
import {DescAscEnum} from "../../enums/desc-asc.enum.ts";
import {Order} from "../../interfaces/order.interface.ts";
import React from "react";
import {CommentInterface} from "../../interfaces/comment.interface.ts";

const OrdersComponent: FC = () => {
    const { orders, setOrders } = useOrdersStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<CommentInterface[]>([])
    const [searchParams, setSearchParams] = useSearchParams();
    const {sortConfig, setSortConfig} = useSortConfigStore();
    const accessToken = useAuthStore.getState().accessToken
    const {manager} = useAuthStore()
    const { currentPage, setCurrentPage, setTotalPages } = usePaginationStore();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const params: Record<string, string> = {
                    ...Object.fromEntries(searchParams.entries()),
                    page: currentPage.toString(),
                };


                if (sortConfig.column) {
                    params.sort = sortConfig.column;
                    params.order = sortConfig.direction;
                }
                const response = await axios.get('http://localhost:3001/api/orders', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: params,
                });
                setOrders(response.data.data);
                setTotalPages(response.data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке заявок:', error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [searchParams, sortConfig, currentPage, comment, comments]);
    const handleExpandOrder = async (orderId) => {
        setExpandedOrderId(orderId === expandedOrderId ? null : orderId); //TODO
        const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }, })

        setComments(response.data.comments)
    };
    const renderValue = (value: string | number | Date ) => {
        if (value instanceof Date) {
            return value.toLocaleDateString();
        }

        return value ?? "null";
    };

    const handleSort = (column: string) => {
        let direction = DescAscEnum.DESC;
        if (sortConfig.column === column && sortConfig.direction === DescAscEnum.DESC) {
            direction = DescAscEnum.ASC;
        }
        setSortConfig({ column, direction });

        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('sort', column);
            newParams.set('order', direction);
            newParams.set('page', '1');
            return newParams;
        });

        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', page.toString());
            return newParams;
        });
    };
    const handleSubmitComment = async (orderId) => {
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

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                    <tr className="bg-gray-100">
                        {[
                            "id", "name", "surname", "email", "phone", "age", "course",
                            "course_format", "course_type", "status", "sum", "alreadyPaid",
                            "msg", "utm", "group", "manager", "created_at"
                        ].map((col) => (
                            <th
                                key={col}
                                onClick={() => handleSort(col)}
                                className="cursor-pointer px-4 py-2 text-left text-[12px] text-white bg-[#76b852]"
                            >
                                {col} {sortConfig.column === col ? (sortConfig.direction === DescAscEnum.ASC ? '▲' : '▼') : ''}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order: Order, index: number) => (
                        <React.Fragment key={order.id}>
                            <tr
                                onClick={() => handleExpandOrder(order.id)}
                                className={`hover:bg-[#43a047] cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                {Object.keys(order).map((key) => {
                                    const typedKey = key as keyof Order;
                                    return (
                                        <td key={key} className="px-1 py-1 text-[12px]">
                                            {renderValue(order[typedKey])}
                                        </td>
                                    );
                                })}
                            </tr>
                            {expandedOrderId === order.id && (
                                <tr>
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
                                                <p className="text-gray-500 text-sm">Нет комментариев</p>
                                            )}
                                        </div>
                                        {(!order.manager || order.manager === manager?.surname) && ( //TODO
                                            <div>
                                                <input
                                                    type="text"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    placeholder="Comment"
                                                    className=" p-2 w-full rounded-[5px] bg-white"
                                                />
                                                <button
                                                    onClick={() => handleSubmitComment(order.id)}
                                                    className="bg-[#43a047] text-white px-4 py-2 mt-2 rounded-[5px]"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>

            <PaginationComponent
                currentPage={currentPage}
                totalPages={usePaginationStore.getState().totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );

};

export default OrdersComponent;