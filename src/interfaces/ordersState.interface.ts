import {Order} from "./order.interface.ts";

export interface OrdersState {
    orders: Order[];
    editOrder: Order | null,
    setOrders: (orders: Order[]) => void;
    addOrder: (order: Order ) => void;
    setEditOrder: (order: Order | null) => void;
}