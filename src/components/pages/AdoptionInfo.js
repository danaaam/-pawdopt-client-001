import React, { useState, useEffect } from "react";
import "./animate.css";


import friend1 from "../assets/home-friend1.png";
import friend2 from "../assets/home-friend2.png";
import friend3 from "../assets/home-friend3.png";
import friend4 from "../assets/home-friend4.png";
import friend5 from "../assets/home-friend5.png";

const AdoptionInfo = () => {
  const [position, setPosition] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition % 5) + 1);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-gray-600 body-font" >
      <div className="container px-5 py-2 mx-auto flex flex-col items-center">
      <div className="flex justify-center">
          <div id="carousel" className="flex">
            <div className={`item ${position === 1 ? 'active' : ''}`}>
              <img src={friend1} alt="" />
            </div>
            <div className={`item ${position === 2 ? 'active' : ''}`}>
              <img src={friend2} alt="" />
            </div>
            <div className={`item ${position === 3 ? 'active' : ''}`}>
              <img src={friend3} alt="" />
            </div>
            <div className={`item ${position === 4 ? 'active' : ''}`}>
              <img src={friend4} alt="" />
            </div>
            <div className={`item ${position === 5 ? 'active' : ''}`}>
              <img src={friend5} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionInfo;
