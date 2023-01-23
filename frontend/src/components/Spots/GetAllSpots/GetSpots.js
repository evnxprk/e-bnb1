import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/spot-reducer";
import { NavLink } from "react-router-dom";
import "./GetSpots.css";

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(allSpots)
  // state.spots comes from the combinedreducers (spotsReducer) in the index.js file in store
  // then we're referencing allSpots in memory to determine if we need to update it or not
  
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);
  
  //useEffect will run after each render not after load if not in []
  
  // if (!allSpots.length) return null;
  if (!spots.length) return null

  return (
    <div id="spot-cards">
      {spots.map((spot) => (
        <div className="spot-cards-container">
          <NavLink to={`spots/${spot.id}`} className="spot-description">
            <img
              className="spot-image-homepage"
              src={spot.previewImage}
              alt="preview"
            />
          </NavLink>
          <div className="spot-card-rating-right">
            <i className="far fa-star"></i>
            {spot.avgRating}
          </div>
          <div className="spot-card-name-middle">{spot.name}</div>
          <span className="spot-card-price-left">${spot.price} per night</span>
          <div className="spot-card">
            {spot.city}, {spot.state}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetAllSpots;
