import {FC} from "react";
import {getPageClass, paginationButtonClass} from "../../styles/styles.ts";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const PaginationComponent: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex gap-2 mt-4">

            {currentPage > 1 && (
                <button className={paginationButtonClass} onClick={() => onPageChange(currentPage - 1)}> {'<'} </button>
            )}


            <button className={getPageClass(currentPage, 1)}
                    onClick={() => onPageChange(1)}>
                1
            </button>

            {currentPage > 4 && (
                <button className={paginationButtonClass} onClick={() => onPageChange(currentPage - 3)}>...
                </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page > 1 && page < totalPages && Math.abs(currentPage - page) <= 2)
                .map((page) => (
                    <button key={page} className={getPageClass(currentPage, page)}
                            onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                ))}


            {currentPage < totalPages - 3 && (
                <button className={paginationButtonClass} onClick={() => onPageChange(currentPage + 3)}>...
                </button>
            )}


            <button className={getPageClass(currentPage, totalPages)}
                    onClick={() => onPageChange(totalPages)}>
                {totalPages}
            </button>


            {currentPage < totalPages && (
                <button className={paginationButtonClass} onClick={() => onPageChange(currentPage + 1)}>
                    {'>'}
                </button>
            )}
        </div>
    );
};

export default PaginationComponent;