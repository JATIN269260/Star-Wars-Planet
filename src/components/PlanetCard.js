import React, { useState, useEffect } from "react";
import ResidentList from "./ResidentList";
import swapapiService from "../Services/swapapiService";
import "../App.css";

const PlanetCard = ({ planet, onResidenceDataLoaded, residents }) => {
  const [showAllResidents, setShowAllResidents] = useState(false);

  const loadingResidents =
    planet.residents.length > 0 && residents.length === 0;

  useEffect(() => {
    const fetchResidents = async () => {
      if (residents.length || planet.residents.length === 0) return;
      try {
        if (planet.residents.length > 0) {
          const residentData = await swapapiService.fetchResidents(
            planet.residents
          );
          onResidenceDataLoaded(planet.url, residentData);
        }
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    };

    fetchResidents();
  }, [planet.residents]);

  const handleShowResidents = () => {
    setShowAllResidents(!showAllResidents);
  };

  return (
    <div className="planet-card-container">
      <div className="planet-card">
        <h2>{planet.name}</h2>
        <p>Climate: {planet.climate}</p>
        <p>Population: {planet.population}</p>
        <p>Terrain: {planet.terrain}</p>
        {loadingResidents ? (
          <p>Loading residents...</p>
        ) : (
          <>
            {residents.length > 0 ? (
              <>
                {showAllResidents ? (
                  <>
                    <ResidentList residents={residents} />
                    <button onClick={handleShowResidents}>
                      Show Less Residents
                    </button>
                  </>
                ) : (
                  <div>
                    <p>First Resident: {residents[0].name}</p>
                    <button onClick={handleShowResidents}>
                      Show All Residents
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>No residents data available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(PlanetCard);
