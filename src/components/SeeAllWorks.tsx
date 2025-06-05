import React from "react";
import "../styles/SeeAllWorks.css";


const SeeAllWorks: React.FC = () => {
  return (
    <div className="see-all-container">
      <div className="see-all-container2">
        <div className="see-all-text">
        <p>See All</p>
        <p>Works</p>
      </div>
      <img
        src="/arrow.svg"
        alt="Arrow Icon"
        className="see-all-arrow"
      />
      </div>
      <div className="see-all-line" />
    </div>
  );
};

export default SeeAllWorks;
