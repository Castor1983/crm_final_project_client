
import {usePaginationStore} from "../../store/pagination.ts";
import {SetURLSearchParams} from "react-router-dom";
import {FC} from "react";


type Props = {
    setSearchParams: SetURLSearchParams;
};
const PaginationComponent: FC<Props> = ({setSearchParams}) => {
    const { currentPage, totalPages, setCurrentPage} = usePaginationStore();


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const pageParams = page.toString()
        setSearchParams({page: pageParams});
    };

    return (
        <div className="flex gap-2 mt-4">
            {/* Кнопка Назад */}
            {currentPage > 1 && (
                <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => handlePageChange(currentPage - 1)}>
                    {'<'}
                </button>
            )}


            <button className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(1)}>
                1
            </button>
            {currentPage > 4 && (
                <button className="px-3 py-1" onClick={() => handlePageChange(currentPage - 3)}>...
                </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page > 1 && page < totalPages && Math.abs(currentPage - page) <= 2)
                .map((page) => (
                    <button key={page} className={`px-3 py-1 rounded ${currentPage === page ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                ))}

            {currentPage < totalPages - 3 && (
                <button className="px-3 py-1" onClick={() => handlePageChange(currentPage + 3)}>...
                </button>
            )}
            <button className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`} onClick={() => handlePageChange(totalPages)}>
                {totalPages}
            </button>
            {currentPage < totalPages && (
                <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => handlePageChange(currentPage + 1)}>
                    {'>'}
                </button>
            )}
        </div>
    );
};
export default PaginationComponent;
