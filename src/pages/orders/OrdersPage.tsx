import {FC} from "react";
import OrdersComponent from "../../components/ordersComponents/OrdersComponent.tsx";

const OrdersPage: FC = () => {

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <OrdersComponent/>
        </div>
    );
};

export default OrdersPage