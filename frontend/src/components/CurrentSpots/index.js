import React, { useEffect, useState } from "react";
import {removeSpotThunk} from "../../store/spot-reducer";
import * as spotsAc from '../../store/spot-reducer'
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import "./Currentspots.css";

function MySpotLists() {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  const history = useHistory();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {spotId} = useParams()

  // const spots = Object.values(spotsObj)
  // const { spotId } = useParams()
  const [loaded, setLoaded] = useState("");
  useEffect(() => {
    dispatch(spotsAc
    .thunkCurrentUsersSpots()).then(() => setLoaded(true));
  }, [dispatch, hasSubmitted]);

  if (!Object.values(spotsObj).length)
    return (
      <div className="no-trips-container">
        <span className="no-trips-title">My Listings</span>
        <div className="no-trips-subtitle">No listings...yet!</div>
        <div className="no-trips-desc">
         List Your Home For Others To Experience The Magic
        </div>
      </div>
    );

  if (!loaded) return null;

  const spotRemoval = async (e) => {
    e.preventDefault();
    await dispatch(removeSpotThunk(spotId));
    history.push("/");
  };

  return (
    <div className="my-trips-container">
      <div className="my-trips-titles-container">
        <div className="my-trips-subtitle">My Listings</div>
      </div>

      {Object.values(spotsObj).map((spot) => (
        <div className="listings-card" key={spot.id}>
          <div className="trip-info-container">
            <div className="trips-info">
              <span className="trips-city">{spot.city}</span>
              <span className="trips-name">{spot.name}</span>
              <div className="trip-date-address">
                <div className="trips-address-container">
                  <span className="trips-address">
                    {spot.address}, {spot.city}
                  </span>
                  <span className="trips-country">{spot.country}</span>
                </div>
              </div>
              <div className="listings-btns ">
                <button
                  className="edit-listing-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`manage/${spot.id}`);
                  }}
                >
                  <i class="fa-regular fa-pen-to-square edit-icon"></i>
                  Update
                </button>
                <button className="delete-spot" onClick={(e) => spotRemoval(e)}>
                  Delete 
                </button>
              </div>
            </div>
            <img
              onClick={() => history.push(`/spots/${spot.id}`)}
              className="listings-img"
              src={spot.previewImage}
              alt="listing"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MySpotLists;
