import React from "react";
import "../Style/Pagination.css";

const Pagination = (props) => {
  const { onPageChange, currentPage, totalPages } = props;

  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <button
          className="pagination-item"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="arrow left"></span>
        </button>
      )}
      <span className="pagination-item selected">{`${currentPage} / ${totalPages}`}</span>
      {currentPage < totalPages && (
        <button
          className="pagination-item"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="arrow right"></span>
        </button>
      )}
    </div>
  );
};

export default Pagination;
