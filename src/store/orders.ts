import { create } from 'zustand';
import {OrdersState} from "../interfaces/ordersState.interface.ts";





export const useOrdersStore = create<OrdersState>((set) => ({
    orders: [],
    setOrders: (orders) => set({ orders }),
    addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}));