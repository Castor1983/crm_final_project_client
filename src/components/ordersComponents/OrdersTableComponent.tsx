import React, {FC, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {DescAscEnum} from "../../enums/desc-asc.enum.ts";
import {Order} from "../../interfaces/order.interface.ts";
import ExpandedOrderComponent from "./ExpandedOrderComponent.tsx";

import {useSortConfigStore} from "../../store/sortConfig.ts";
import {useOrdersStore} from "../../store/orders.ts";
import {usePaginationStore} from "../../store/pagination.ts";

import {COLUMNS_NAME} from "../../common/constants.ts";

type Props = {
    setIsModalOpen: (open: boolean) => void
}
const OrdersTableComponent: FC<Props> =({setIsModalOpen}) => {
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
    const {sortConfig, setSortConfig} = useSortConfigStore();
    const { orders} = useOrdersStore();
    const [, setSearchParams] = useSearchParams();
    const {setCurrentPage} = usePaginationStore();
    const excludedColumns = ["msg", "utm"];

    const handleExpandOrder = (orderId: number) => {
        setExpandedOrder(prevId => (prevId === orderId ? null : orderId));
    };
    const renderValue = (value: string | number | null, ) => {
        if (typeof value === "string" && value.includes("T")) {
            return new Date(value).toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
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
        <div className="overflow-x-auto shadow-md rounded-lg min-w-[100vh]">
            <table className="min-w-[100vh] table-auto">
                <thead>
                <tr className="bg-gray-100">
                    {COLUMNS_NAME.orderColumnsName.map((col) => (
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
                {orders?.map((order: Order, index: number) => (
                    <React.Fragment key={order.id}>
                        <tr
                            onClick={() => handleExpandOrder(order.id)}
                                className={`hover:bg-[#43a047] cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                        >
                            {Object.keys(order)
                                .filter((key) => !excludedColumns.includes(key))
                                .map((key) => {
                                    const typedKey = key as keyof Order;
                                    return (
                                        <td key={key} className="px-1 py-1 text-[12px]">
                                            {renderValue(order[typedKey])}
                                        </td>
                                );
                            })}
                        </tr>
                        {expandedOrder === order.id && (
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