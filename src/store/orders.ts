import { create } from 'zustand';

import { Order } from '../interfaces/order.interface.ts';
import { OrdersState } from '../interfaces/ordersState.interface.ts';

export const useOrdersStore = create<OrdersState>(set => ({
  orders: [],
  editOrder: null,
  setOrders: orders => set({ orders }),
  setEditOrder: (editOrder: Order | null) => set({ editOrder }),
  addOrder: order => set(state => ({ orders: [...state.orders, order] })),
}));
