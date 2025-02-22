const buttonClass = "bg-[#43a047] hover:bg-green-700 text-white m-1 p-2 rounded flex items-center gap-2";
const inputClass = "bg-gray-200 p-2 rounded focus:outline-none m-1";
const paginationButtonClass ="px-4 py-1 bg-[#76b852] text-white rounded-full hover:bg-[#43a047] cursor-pointer"
const getPageClass = (currentPage: number, pageNumber: number) => {
    return `px-3 py-1 rounded-full ${currentPage === pageNumber ? 'bg-[#43a047] text-white' : 'bg-[#76b852] text-white'} hover:bg-[#43a047] cursor-pointer`;
};
export {
    buttonClass,
    inputClass,
    paginationButtonClass,
    getPageClass
}