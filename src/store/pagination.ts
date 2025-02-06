import {create} from 'zustand';
import {PaginationState} from "../interfaces/paginationState.interface.ts";

export const usePaginationStore = create<PaginationState>((set) => ({
    currentPage: 1,
    totalPages: 1,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setTotalPages: (pages: number) => set({ totalPages: pages }),
}));