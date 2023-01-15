import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/reducer";

export default function SpotDetail() {
  const [spots, setSpots] = useState([])
  const dispatch = useDispatch();
  const spot = useSelector((state) => Object.values(state.spots.AllSpots))
  console.log("spot:", spot)

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getAllSpotsThunk())
      setSpots(response) 
    }
    fetchData()

  }, [dispatch]);

  if (!spots) {
    return null;
  }
  return (
    <div id="spot-details">
      {spots.map((spot) => (
        <Link to={`/spots/${spots.id}`} className="spot-content">
          <div className="spot-image-container">
            {spots.previewImage ? (
              <img src={`${spot.previewImage}`} alt="spot-preview" />
            ) : (
              <img
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="spot-previews"
              />
            )}
          </div>
          <div className="spot-description">
            <div className="spot-description-right">
              <p className="spot-location">
                {spot.city}, {spot.state}
              </p>
              <p className="spot-location-availability">Available Now</p>
              <p className="spot-location-price">${spot.price} Per Night</p>
            </div>
            <div>
              <p className="eachspot-content-rating">
                <i class="far fa-star" ></i>
                {spot.avgRating ? (
                  Number(spot.avgRating).toFixed(2)
                ) : (
                  <p> New</p>
                )}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
