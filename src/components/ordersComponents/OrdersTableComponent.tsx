import React, {FC, useState} from "react";
import {DescAscEnum} from "../../enums/desc-asc.enum.ts";
import {Order} from "../../interfaces/order.interface.ts";
import ExpandedOrderComponent from "./ExpandedOrderComponent.tsx";
import axios from "axios";
import {useAuthStore} from "../../store/auth.ts";
import {useCommentsStore} from "../../store/comments.ts";
import {useSortConfigStore} from "../../store/sortConfig.ts";
import {useOrdersStore} from "../../store/orders.ts";
import {useSearchParams} from "react-router-dom";
import {usePaginationStore} from "../../store/pagination.ts";

type Props = {
    setIsModalOpen: (open: boolean) => void
}
const OrdersTableComponent: FC<Props> =({setIsModalOpen}) => {
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
    const accessToken = useAuthStore.getState().accessToken;
    const { setComments}= useCommentsStore();
    const {sortConfig, setSortConfig} = useSortConfigStore();
    const { orders} = useOrdersStore();
    const [, setSearchParams] = useSearchParams();
    const {setCurrentPage} = usePaginationStore();


    const handleExpandOrder = async (orderId: number| null) => {
        setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
        const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`, { //TODO
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
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-gray-100">
                    {[
                        "id", "name", "surname", "email", "phone", "age", "course",
                        "course_format", "course_type", "status", "sum", "alreadyPaid",
                        "msg", "utm", "group", "manager", "created_at"  // TODO
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
                            <ExpandedOrderComponent order={order} setIsModalOpen={setIsModalOpen}/>

                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default OrdersTableComponent;