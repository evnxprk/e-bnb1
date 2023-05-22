import React from "react"; // Import useState from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createBookingsThunk } from "../../../store/bookings";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

export default function Bookings() {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { spotId } = useParams()
const mySpot = useSelector((state) => state.spots.singleSpot);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState([]);

//   const newStartDate = (date) => setStartDate(date);
//   const newEndDate = (date) => setEndDate(date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const bookingData = {
      startDate,
      endDate,
    };
    return dispatch(createBookingsThunk(bookingData, spotId))
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
  };

  return (
    <div>
      <div className="create-booking-container">
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
            <button className="button form-button" type="submit">
              Confirm your stay with us
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
