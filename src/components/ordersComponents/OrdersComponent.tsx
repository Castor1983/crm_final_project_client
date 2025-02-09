import React from "react";
import {FC, useEffect, useState} from "react";
import axios from "axios";

import {useOrdersStore} from "../../store/orders.ts";
import {useAuthStore} from "../../store/auth.ts";
import {usePaginationStore} from "../../store/pagination.ts";
import PaginationComponent from "../paginationComponents/PaginationCOmponent.tsx";
import {useSearchParams} from "react-router-dom";
import {useSortConfigStore} from "../../store/sortConfig.ts";
import {DescAscEnum} from "../../enums/desc-asc.enum.ts";
import {Order} from "../../interfaces/order.interface.ts";


import ModalWindowComponent from "./ModalWindowComponent.tsx";
import ExpandedOrderComponent from "./ExpandedOrderComponent.tsx";
import {useCommentsStore} from "../../store/comments.ts";

const OrdersComponent: FC = () => {
    const { orders, setOrders } = useOrdersStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
    const {comments, setComments}= useCommentsStore()
    const [searchParams, setSearchParams] = useSearchParams();
    const {sortConfig, setSortConfig} = useSortConfigStore();
    const accessToken = useAuthStore.getState().accessToken
    const { currentPage, setCurrentPage, setTotalPages } = usePaginationStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {editOrder}=useOrdersStore()

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

            } catch (error) {
                console.error('Ошибка при загрузке заявок:', error);

            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [searchParams, sortConfig, currentPage, comments]);

    const handleExpandOrder = async (orderId: number| null) => {
        setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
        const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }, })

        setComments(response.data.comments)
    };
    const renderValue = (value: string | number | Date | null) => {
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



    if (loading) {
        return <div>loading...</div>;
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
                            {expandedOrderId === order.id && ( <ExpandedOrderComponent order={order} setIsModalOpen={setIsModalOpen}/>

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
            {isModalOpen && editOrder && (
                <ModalWindowComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            )}
        </div>
    );

};

export default OrdersComponent;