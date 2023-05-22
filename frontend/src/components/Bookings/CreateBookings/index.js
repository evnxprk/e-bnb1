// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../../context/Modal";
// import { createBookingsThunk } from "../../../store/bookings";

// export default function Bookings() {
//   const { closeModal } = useModal();
//   const dispatch = useDispatch();
//   const mySpot = useSelector((state) => state.Spot.singleSpot);

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [errors, setErrors] = useState([]);

//   const newStartDate = (date) => setStartDate(date);
//   const newEndDate = (date) => setEndDate(date);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//     const bookingData = {
//       startDate,
//       endDate,
//     };
//     return dispatch(createBookingsThunk(bookingData, mySpot))
//       .then(() => {
//         closeModal();
//       })
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(Object.values(data.errors));
//       });
//   };
//   return (
//     <div>
//       <div className="create-booking-container">
//         <div>
//           <ul className="errors-list">
//             {errors.map((error) => (
//               <li key={error}>{error} </li>
//             ))}
//           </ul>
//         </div>
//         <div className="booking-form-header">
//           <h1>Book your stay with us!</h1>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             style={{ cursor: "pointer" }}
//           >
//             X
//           </button>
//         </div>
//         <section className="form-body-container">
//           <form className="form-body" onSubmit={handleSubmit}>
//             <label className="form-label">
//               Start date:
//               <DatePicker
//                 selected={startDate}
//                 onChange={newStartDate}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//               />
//             </label>
//             <label className="form-label">
//               End date:
//               <DatePicker
//                 selected={endDate}
//                 onChange={newEndDate}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//               />
//             </label>
//             <button className="button form-button" type="submit">
//               Confirm your stay with us
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// }
