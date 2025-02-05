import  {FC} from 'react';
import { usePaginationStore } from '../../store/pagination.ts';

const PaginationComponent: FC = () => {
    const { currentPage, totalPages, setCurrentPage } = usePaginationStore();

    // Функция для генерации списка страниц
    const generatePageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        if (totalPages <= 7) {
            // Если страниц меньше или равно 7, отображаем все страницы
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Если страниц больше 7, показываем ограниченное количество
            if (currentPage <= 4) {
                // Показать 7 первых страниц
                pageNumbers.push(1, 2, 3, 4, 5, 6, 7);
            } else if (currentPage > totalPages - 4) {
                // Показать последние 7 страниц
                pageNumbers.push(totalPages - 6, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Показать страницы вокруг текущей с добавлением "..."
                pageNumbers.push(currentPage - 3, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, currentPage + 3);
            }
        }
        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex justify-center items-center mt-4">
            {/* Кнопка "Предыдущая" */}
            {currentPage > 1 && (
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                    Предыдущая
                </button>
            )}

            {/* Кнопки с номерами страниц */}
            {pageNumbers.map((page, index) => {
                // Показать многоточие
                if (page === '...') {
                    return (
                        <span key={index} className="px-4 py-2 mx-1">
              ...
            </span>
                    );
                }

                return (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Кнопка "Следующая" */}
            {currentPage < totalPages && (
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
                >
                    Следующая
                </button>
            )}
        </div>
    );
};

export default PaginationComponent;