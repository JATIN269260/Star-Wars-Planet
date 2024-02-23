import React from "react";

const ResidentList = ({ residents }) => {
  return (
    <div>
      <h3>Residents:</h3>
      <ul>
        {residents.map((resident, index) => (
          <li key={index}>
            {resident.name} - Height: {resident.height}, Mass: {resident.mass},
            Gender: {resident.gender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResidentList;
