import {FC} from "react";

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
                <button className="px-4 py-1 bg-[#76b852] text-white rounded-full hover:bg-[#43a047] cursor-pointer " onClick={() => onPageChange(currentPage - 1)}> {'<'} </button>
            )}


            <button className={`px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-[#43a047] text-white' : 'bg-[#76b852] text-white'} hover:bg-[#43a047] cursor-pointer`} onClick={() => onPageChange(1)}>
                1
            </button>

            {currentPage > 4 && (
                <button className="px-4 py-1 bg-[#76b852] text-white rounded-full hover:bg-[#43a047] cursor-pointer" onClick={() => onPageChange(currentPage - 3)}>...
                </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page > 1 && page < totalPages && Math.abs(currentPage - page) <= 2)
                .map((page) => (
                    <button key={page} className={`px-3 py-1 rounded-full ${currentPage === page ? 'bg-[#43a047] text-white' : 'bg-[#76b852] text-white'} hover:bg-[#43a047] cursor-pointer`} onClick={() => onPageChange(page)}>
                        {page}
                    </button>
                ))}


            {currentPage < totalPages - 3 && (
                <button className="px-4 py-1 bg-[#76b852] text-white rounded-full hover:bg-[#43a047] cursor-pointer" onClick={() => onPageChange(currentPage + 3)}>...
                </button>
            )}


            <button className={`px-3 py-1 rounded-full ${currentPage === totalPages ? 'bg-[#43a047] text-white' : 'bg-[#76b852] text-white'} hover:bg-[#43a047] cursor-pointer`} onClick={() => onPageChange(totalPages)}>
                {totalPages}
            </button>


            {currentPage < totalPages && (
                <button className="px-4 py-1 bg-[#76b852] text-white rounded-full hover:bg-[#43a047] cursor-pointer" onClick={() => onPageChange(currentPage + 1)}>
                    {'>'}
                </button>
            )}
        </div>
    );
};

export default PaginationComponent;