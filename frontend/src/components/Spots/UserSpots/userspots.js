import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserSpots } from "../../../store/spot-reducer";
import { useModal } from "../../../context/Modal";

function UserSpots() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const userSpots = useSelector((state) => state.spots.user);

  useEffect(() => {
    dispatch(getCurrentUserSpots()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }, [dispatch, setErrors]);

  if (!userSpots) {
    return null;
  }

  return (
    <div className="my-spots">
      <div className="my-spots-header-div">
        <h1>My Listings</h1>
      </div>
      <div className="my-spots-modal-div">
        {Object.values(userSpots).length ? (
          Object.values(userSpots).map((spot) => (
            <div className="my-spots-card-div" key={spot.id}>
              <div>{spot.spot}</div>
              <div>{spot.stars}</div>
            </div>
          ))
        ) : (
          <div>You have no spots.</div>
        )}
      </div>
    </div>
  );
}

export default UserSpots;
