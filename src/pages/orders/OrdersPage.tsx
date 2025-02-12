import {FC} from "react";
import OrdersComponent from "../../components/ordersComponents/OrdersComponent.tsx";
import LayoutComponent from "../../components/LayoutComponent.tsx";
import FilterOrdersComponent from "../../components/filtersComponents/FilterOrdersComponent.tsx";




const OrdersPage: FC = () => {

    return (
        <LayoutComponent>
            <div className="flex flex-col min-h-screen items-center bg-gray-100">
                <FilterOrdersComponent/>
                <OrdersComponent/>

            </div>
        </LayoutComponent>

    );
};

export default OrdersPage