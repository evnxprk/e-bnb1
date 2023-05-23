import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBookingsThunk } from "./bookings";

const EditBooking = ({ bookingId }) => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking[bookingId]);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editBookingsThunk(formData, bookingId));

    // Reset the form
    setFormData({
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div>
      <h2>Edit Booking</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBooking;
