import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpotsThunk } from "../../../store/spot-reducer";
import { useModal } from "../../../context/Modal";

function UserSpots() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const userSpots = useSelector((state) => state.spots.currentUserSpots);

  useEffect(() => {
    dispatch(getCurrentUserSpotsThunk()).catch((err) => {
      console.error("Error fetching user spots:", err);
    });
  }, [dispatch]);

  if (userSpots === null) {
    // Loading state, you can display a spinner or loading message here
    return <div>Loading...</div>;
  }

  if (Object.keys(userSpots).length === 0) {
    return (
      <div className="my-spots">
        <div className="my-spots-header-div">
          <h1>My Listings</h1>
        </div>
        <div className="my-spots-modal-div">
          <div>You have no spots.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-spots">
      <div className="my-spots-header-div">
        <h1>My Listings</h1>
      </div>
      <div className="my-spots-modal-div">
        {Object.values(userSpots).map((spot) => (
          <div className="my-spots-card-div" key={spot.id}>
            <div>{spot.name}</div>
            <div>{spot.stars}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSpots;
