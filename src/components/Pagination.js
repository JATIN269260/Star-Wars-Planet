import React, { useState, useEffect } from "react";
import "../Style/Pagination.css";
import swapiService from "../Services/swapapiService";

const Pagination = ({ onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const data = await swapiService.fetchPlanets(page);
      setPlanets(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <button
          className="pagination-item"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="arrow left"></span>
        </button>
      )}
      <span className="pagination-item selected">{`${currentPage} / ${totalPages}`}</span>
      {currentPage < totalPages && (
        <button
          className="pagination-item"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="arrow right"></span>
        </button>
      )}
    </div>
  );
};

export default Pagination;
