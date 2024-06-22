/* eslint-disable react/prop-types */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, 6);
    }

    if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 5);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="mt-20 flex justify-center">
      <button
        className={`mx-1 rounded-md border px-4 py-2 font-medium ${currentPage === 1 ? 'cursor-not-allowed bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {getPageNumbers().map(number => (
        <button
          key={number}
          className={`mx-1 rounded-md border px-4 py-2 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={`mx-1 rounded-md border px-4 py-2 font-medium ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
