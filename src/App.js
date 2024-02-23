import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PlanetCard from "./components/PlanetCard";
import Pagination from "./components/Pagination.js";
import swapiService from "./Services/swapapiService.js";
import "./App.css";

const PAGE_SIZE = 10;

const a = [];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    currentPage: 1,
    loadedPages: [],
  });
  const [residents, setResidence] = useState({});

  const { count, currentPage, loadedPages } = pageInfo;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const currentPageDataIndex = (currentPage - 1) * PAGE_SIZE;
  const currentPagePlanets = planets.slice(
    currentPageDataIndex,
    currentPageDataIndex + PAGE_SIZE
  );

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const data = await swapiService.fetchPlanets(currentPage);
      setPlanets((state) => [...state, ...data.results]);
      setPageInfo((state) => ({
        ...state,
        count: data.count,
        loadedPages: [...state.loadedPages, currentPage],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasCurrentPageDataLoaded = loadedPages.includes(currentPage);

    if (!hasCurrentPageDataLoaded) {
      fetchPlanets();
    }
  }, [currentPage]);

  const onPageChange = (newPage) => {
    setPageInfo((state) => ({
      ...state,
      currentPage: newPage,
    }));
  };

  const onResidenceDataLoaded = useCallback((planet, residents) => {
    setResidence((state) => ({
      ...state,
      [planet]: residents,
    }));
  }, []);

  const renderPlanet = (planet) => {
    const currentPlanetId = planet.url;
    const currentPlanetResidents = residents[currentPlanetId] ?? [];

    return (
      <PlanetCard
        key={currentPlanetId}
        residents={currentPlanetResidents}
        onResidenceDataLoaded={onResidenceDataLoaded}
        planet={planet}
      />
    );
  };

  return (
    <Router>
      <div className="app">
        <h1 className="header">Star Wars Planets Directory</h1>
        <div className="planet-cards-container">
          {!loading ? currentPagePlanets.map(renderPlanet) : <p>Loading...</p>}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </Router>
  );
};

export default App;
