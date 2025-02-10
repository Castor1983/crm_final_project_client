import {FC} from "react";
import OrdersComponent from "../../components/ordersComponents/OrdersComponent.tsx";
import HeaderComponent from "../../components/headerComponents/HeaderComponent.tsx";
import FooterComponent from "../../components/footerComponents/FooterComponent.tsx";



const OrdersPage: FC = () => {

    return (
        <div className="flex flex-col min-h-screen items-center bg-gray-100">
            <HeaderComponent/>
            <OrdersComponent/>
            <FooterComponent/>
        </div>
    );
};

export default OrdersPage