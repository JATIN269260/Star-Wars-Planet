// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlanetCard from "./components/PlanetCard";
import ResidentList from "./components/ResidentList.js";
import Pagination from "./components/Pagination.js";
import swapiService from "./Services/swapapiService.js";
import "./App.css";

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const planetsPerPage = 9; // Set the number of planets per page

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const data = await swapiService.fetchPlanets(currentPage);
        setPlanets(data.results);
        setTotalPages(Math.ceil(data.count / planetsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [currentPage]);

  return (
    <Router>
      <div className="app">
        <h1 className="header">Star Wars Planets Directory</h1>
        <div className="planet-cards-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {planets.map((planet) => (
                <PlanetCard key={planet.name} planet={planet} />
              ))}
            </>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Router>
  );
};

export default App;
