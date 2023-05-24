import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookingsThunk, deleteBookingsThunk } from "../../../store/bookings";
import DeleteBooking from "../DeleteBookings";

export default function UserBookings() {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.booking.user);

  useEffect(() => {
    dispatch(getUserBookingsThunk());
  }, [dispatch]);

  if (!userBookings) {
    return null;
  }

  const handleDeleteBooking = (bookingId) => {
    dispatch(deleteBookingsThunk(bookingId));
  };

  return (
    <div className="my-bookings">
      <div className="my-bookings-header-div">
        <span className="no-trips-title">Trips</span>
      </div>
      <div className="my-bookings-modal-div">
        {Object.values(userBookings).length ? (
          Object.values(userBookings).map((booking) => (
            <div className="my-bookings-card-div" key={booking.id}>
              <div className="booking-preview-image">
                <img
                  src={booking.Spot.previewImage}
                  alt="Preview"
                  className="preview-image"
                  style={{ width: "500px", borderRadius: "20px" }}
                />
                <div className="trips-name" style={{fontWeight:'bold', fontSize:"24px"}}>{booking.Spot.name}</div>
                <div className="booking-start-date">
                  Start Date: {booking.startDate}
                </div>
                <div className="booking-end-date">
                  End Date: {booking.endDate}
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteBooking(booking.id)}
                  style={{marginBottom:"10px", marginTop:"8px"}}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>You have no bookings.</div>
        )}
      </div>
    </div>
  );
}
