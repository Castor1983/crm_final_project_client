import {FC, useEffect, useState} from "react";
import axios from "axios";

import {useOrdersStore} from "../../store/orders.ts";
import {useAuthStore} from "../../store/auth.ts";
import {usePaginationStore} from "../../store/pagination.ts";
import PaginationComponent from "../paginationComponents/PaginationCOmponent.tsx";
import {useSearchParams} from "react-router-dom";
import {useSortConfigStore} from "../../store/sortConfig.ts";
import OrderUpdateComponent from "./OrderUpdateComponent.tsx";
import {useCommentsStore} from "../../store/comments.ts";
import OrdersTableComponent from "./OrdersTableComponent.tsx";

const OrdersComponent: FC = () => {
    const {setOrders } = useOrdersStore();
    const [loading, setLoading] = useState<boolean>(true);
    const {comments}= useCommentsStore()
    const [searchParams, setSearchParams] = useSearchParams();
    const {sortConfig} = useSortConfigStore();
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
                const response = await axios.get('http://localhost:3001/api/orders', {//TODO
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
    }, [searchParams, sortConfig, currentPage, comments, editOrder]);

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