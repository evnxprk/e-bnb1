import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/reducer";
import { NavLink } from "react-router-dom";
import "./GetSpots.css"

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector(state => Object.values(state.spots.allSpots))

  // state.spots comes from the combinedreducers (spotsReducer) in the index.js file in store
  // then we're referencing allSpots in memory to determine if we need to update it or not

useEffect(() => {
   dispatch(getAllSpotsThunk())
}, [dispatch]);


//useEffect will run after each render not after load if not in []

if(!allSpots.length) return null

   return (
     <div id="spot-cards">
       <h1>Welcome to E-BNB</h1>
       {allSpots.map((spot) => (
         <NavLink to={`spots/${spot.id}`} className="spot-description">
           <div className="spot-cards-container">
             <img className ="spot-image-homepage" src={spot.previewImage} alt="preview" />
             <div className="spot-card">
               {" "}
               {spot.city}, {spot.state}
               <div className="spot-card-rating-right">
                 <i class="far fa-star"></i> 
                  {spot.avgRating}
               </div>
               <div className="spot-card-name-middle">{spot.name}</div>
               <div className="spot-card-price-left">
                 ${spot.price} per night
               </div>
             </div>
           </div>
         </NavLink>
       ))}
     </div>
   );
};

export default GetAllSpots;
