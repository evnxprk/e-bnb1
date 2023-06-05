import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createBookingsThunk } from "../../../store/bookings";
import { useHistory, useParams } from "react-router-dom";
import "./Bookings.css";

export default function Bookings({ spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const mySpot = useSelector((state) => state.spots.singleSpot);
  const sessionUser = useSelector((state) => state.session.user);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const bookingData = {
      startDate,
      endDate,
    };
    return dispatch(createBookingsThunk(bookingData, spotId)).then(() => {
      closeModal();
      history.push("/");
    });
  };

  const renderLoginMessage = () => {
    if (!sessionUser) {
      return (
        <div className="login-message" style={{ fontWeight: "bold" }}>
          Please
          <span
            className="login-link"
            style={{ fontWeight: "bold" }}>
            {" "}
            log in
          </span>
          to create a booking.
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="create-booking-container">
        {renderLoginMessage()}
        <div>
          <ul className="errors-list">
            {errors.map((error) => (
              <li key={error}>{error} </li>
            ))}
          </ul>
        </div>
        <div className="booking-form-header">
          <h1>Book your stay with us!</h1>
        </div>
        <section className="form-body-container">
          <form className="form-body" onSubmit={handleSubmit}>
            <label className="form-label">
              Start date:
              <input
                className="booking-input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="form-label">
              End date:
              <input
                className="booking-input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <div className="cleaning-fees" style={{ fontSize: "20px" }}>Cleaning fee: $17
            </div>
            {/* <div className="taxes-fees" style={{ fontSize: "20px" }}>
              Taxes and fees: $80
            </div> */}
            <div
              className="total-price"
              style={{
                fontSize: "20px",
                paddingBottom: "15px",
                // padding: "5px",
              }}
            >Total before taxes: ${mySpot.price}
            </div>
            {sessionUser ? (
              <button className="button form-button" type="submit">
                Confirm your stay with us
              </button>
            ) : (
              <button
                className="button form-button"
                onClick={() => history.push("/login")}
              >
                Log in to create a booking
              </button>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
