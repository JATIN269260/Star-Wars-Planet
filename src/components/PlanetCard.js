import React, { useState, useEffect } from "react";
import ResidentList from "./ResidentList";
import swapapiService from "../Services/swapapiService";
import "../App.css"; // Import the CSS file

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [loadingResidents, setLoadingResidents] = useState(true);
  const [showAllResidents, setShowAllResidents] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoadingResidents(true);

        // Check if planet has residents before fetching data
        if (planet.residents.length > 0) {
          const residentData = await swapapiService.fetchResidents(
            planet.residents
          );
          setResidents(residentData);
        } else {
          // Set residents to empty array if no residents
          setResidents([]);
        }
      } catch (error) {
        console.error("Error fetching residents:", error);
      } finally {
        setLoadingResidents(false);
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

export default PlanetCard;
