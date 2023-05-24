import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteBookingsThunk } from "../../../store/bookings";

const DeleteBooking = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
//   const {bookingId} = useParams()

  const deleteBooking = async () => {
    await dispatch(deleteBookingsThunk());
    history.push('/')
  };

  return (
    <div className="delete-booking">
      {sessionUser && (
        <button onClick={deleteBooking}>Cancel Reservation</button>
      )}
    </div>
  );
};

export default DeleteBooking;
