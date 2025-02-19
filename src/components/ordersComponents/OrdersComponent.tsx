import {FC, useEffect, useState} from "react";

import {useOrdersStore} from "../../store/orders.ts";
import {usePaginationStore} from "../../store/pagination.ts";
import PaginationComponent from "../paginationComponents/PaginationCOmponent.tsx";
import {useSearchParams} from "react-router-dom";
import {useSortConfigStore} from "../../store/sortConfig.ts";
import OrderUpdateComponent from "./OrderUpdateComponent.tsx";
import OrdersTableComponent from "./OrdersTableComponent.tsx";
import {apiAuth} from "../../services/api.ts";
import {ordersUrl} from "../../common/urls.ts";

const OrdersComponent: FC = () => {
    const {setOrders } = useOrdersStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const {sortConfig} = useSortConfigStore();
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
                const response = await apiAuth.get(ordersUrl, {
                    params
                });
                setOrders(response.data.data);
                setTotalPages(response.data.total_pages);

            } catch (error) {
                console.error('Ошибка при загрузке заявок:', error);

            }
        };
        fetchOrders();
    }, [searchParams, sortConfig, currentPage, editOrder]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', page.toString());
            return newParams;
        });
    };

    return (
        <div className="flex flex-col items-center">
            <OrdersTableComponent setIsModalOpen={setIsModalOpen}/>
            <PaginationComponent
                currentPage={currentPage}
                totalPages={usePaginationStore.getState().totalPages}
                onPageChange={handlePageChange}
            />
            {isModalOpen && editOrder && (
                <OrderUpdateComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            )}
        </div>
    );

};

export default OrdersComponent;