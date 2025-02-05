export interface PaginationState {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    setTotalPages: (pages: number) => void;
}