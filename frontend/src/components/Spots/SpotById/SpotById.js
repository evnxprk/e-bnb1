import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { getOneSpotThunk, removeSpotThunk } from "../../../store/spot-reducer";
import { useParams, useHistory } from "react-router-dom";
import EditSpot from "../EditSpots/EditSpots";
import "./SpotById.css";

const MySpot = () => {
  const { spotId } = useParams();
  const history = useHistory()
  const [randomNumber, setRandomNumber] = useState(0)
  // const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  //   console.log("the sessionUser: ", sessionUser)
  const spot = useSelector((state) => state.spots.singleSpot);
  //   console.log("what is appearing here?????", spot);

  const spots = Object.values(spot)


  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    setRandomNumber(Math.floor(Math.random() * 20))
  }, [dispatch]);
  if (!spots.length) return null;

const spotRemoval = async (e) => {
  e.preventDefault();
  await dispatch(removeSpotThunk(spot.id));
 history.push("/");
};
  

  return (
    <>
      <div className="spot-name-middle">
        {spot.name} • {spot.city}, {spot.state} • <i class="far fa-star"></i>{" "}
        {spot.avgStarRating}
      </div>
      {spot.SpotImages.map((img) => (
        <div>
          <img className="spot-image-by-id" src={img.url} alt="spot-by-id" />
        </div>
      ))}
      <div className="spot-owner-name">
        Entire Home Hosted By {spot.Owner.firstName}
      </div>

      <h4>
        {" "}
        {randomNumber} guests | {randomNumber} bedrooms | {randomNumber} beds |{" "}
        {randomNumber} baths{" "}
      </h4>
      <div className="delete-spot">
        {sessionUser ? (
          <button onClick={(e) => spotRemoval(e)}>Delete This Spot</button>
        ) : null}
        <div className="edit-spot">
          {sessionUser ? (
            <EditSpot spot={spot} />
          ) : null}
        </div>
        
      </div>
    </>
  );
};

export default MySpot;

 