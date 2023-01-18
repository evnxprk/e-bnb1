import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../../store/reducer";
import { useParams } from "react-router-dom";
import "./SpotById.css"

const MySpot = () => {
  const { spotId } = useParams();   
  const dispatch = useDispatch(); 
  const sessionUser = useSelector(state => state.session.user);
//   console.log("the sessionUser: ", sessionUser)

  const spot = useSelector((state) => state.spots.singleSpot);
//   console.log("what is appearing here?????", spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch]);
if(!Object.values(spot).length) return null
return (
  <>
    <div className="spot-name-middle">
      {spot.name} • {spot.city}, {spot.state} • <i class="far fa-star"></i>{" "}
      {spot.avgStarRating}
    </div>
    {spot.SpotImages.map((img) => (
      <div>
        <img className = "spot-image-by-id" src={img.url} alt="spot-by-id" />
      </div>
    ))}
    <div className="home-hosted-by">
      {" "}
      this home is hosted by the amazing {sessionUser.firstName}!
    </div>
    <h4>4 guests | 3 bedrooms | 3 beds | 2 baths </h4>
  </>
);
};

export default MySpot;
