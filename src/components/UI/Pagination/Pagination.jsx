import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>
      <span>
        {currentPage + 1} / {totalPages}
      </span>
      <button
        disabled={currentPage + 1 >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
