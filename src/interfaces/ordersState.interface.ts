import {Order} from "./order.interface.ts";

export interface OrdersState {
    orders: Order[];
    setOrders: (orders: Order[]) => void;
    addOrder: (order: Order) => void;
}