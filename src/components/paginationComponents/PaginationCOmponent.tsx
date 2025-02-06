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

            <button
                className={`px-5 py-1 rounded-[15px] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-green-500 text-white'}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {'<'}
            </button>

            <button
                className={`px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
                onClick={() => onPageChange(1)}
            >
                1
            </button>


            {currentPage > 4 && <button className="px-3 py-1 bg-green-500 text-white rounded-full " onClick={() => onPageChange(currentPage - 3)}>...</button>}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page > 1 && page < totalPages && Math.abs(currentPage - page) <= 2)
                .map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1 rounded-full ${currentPage === page ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

            {currentPage < totalPages - 3 && <button className="px-3 py-1 bg-green-500 text-white rounded-full" onClick={() => onPageChange(currentPage + 3)}>...</button>}

            {totalPages > 1 && (
                <button
                    className={`px-3 py-1 rounded-full ${currentPage === totalPages ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </button>
            )}


            <button
                className={`px-5 py-1 rounded-[15px] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-green-500 text-white'}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {'>'}
            </button>
        </div>
    );
};

export default PaginationComponent;