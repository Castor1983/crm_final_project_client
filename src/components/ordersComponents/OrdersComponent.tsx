import {FC, useEffect, useState} from "react";
import {useOrdersStore} from "../../store/orders.ts";
import axios from "axios";
import {useAuthStore} from "../../store/auth.ts";
import {usePaginationStore} from "../../store/pagination.ts";
import PaginationComponent from "../paginationComponents/PaginationCOmponent.tsx";

const OrdersComponent: FC = () => {
    const { orders, setOrders } = useOrdersStore();
    const [loading, setLoading] = useState<boolean>(true);
    const accessToken = useAuthStore((state) => state.accessToken);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/orders', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setOrders(response.data.data);
                usePaginationStore.getState().setTotalPages(response.data.total_pages);
                usePaginationStore.getState().setCurrentPage(response.data.current_page);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке заявок:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [setOrders, setCurrentPage]);
    const renderValue = (value: any) => {
        return value ? value : 'Нет данных';
    };
    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
       <> <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-2 text-left border">ID</th>
                    <th className="px-4 py-2 text-left border">Name</th>
                    <th className="px-4 py-2 text-left border">Surname</th>
                    <th className="px-4 py-2 text-left border">Email</th>
                    <th className="px-4 py-2 text-left border">Phone</th>
                    <th className="px-4 py-2 text-left border">Age</th>
                    <th className="px-4 py-2 text-left border">Course</th>
                    <th className="px-4 py-2 text-left border">Course Format</th>
                    <th className="px-4 py-2 text-left border">Course Type</th>
                    <th className="px-4 py-2 text-left border">Status</th>
                    <th className="px-4 py-2 text-left border">Sum</th>
                    <th className="px-4 py-2 text-left border">Already Paid</th>
                    <th className="px-4 py-2 text-left border">Created At</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 border">{renderValue(order.id)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.name)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.surname)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.email)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.phone)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.age)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.course)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.course_format)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.course_type)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.status)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.sum)}</td>
                        <td className="px-4 py-2 border">{renderValue(order.alreadyPaid)}</td>
                        <td className="px-4 py-2 border">{renderValue(new Date(order.created_at).toLocaleDateString())}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    <PaginationComponent/> </>
    );
};

export default OrdersComponent