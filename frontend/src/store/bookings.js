import { csrfFetch } from "./csrf";

const GET_SPOT_BOOKINGS = "bookings/GET_SPOT_BOOKINGS";
const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";
const CREATE_BOOKINGS = "bookings/CREATE_BOOKINGS";
const DELETE_BOOKINGS = "bookings/DELETE_BOOKINGS";

const getSpotBookings = (booking) => ({
  type: GET_SPOT_BOOKINGS,
  payload: booking,
});

const getUserBookings = (booking) => ({
  type: GET_USER_BOOKINGS,
  payload: booking,
});

const createBookings = (booking) => ({
  type: CREATE_BOOKINGS,
  payload: booking,
});

const deleteBookings = (bookingId) => ({
  type: DELETE_BOOKINGS,
  payload: bookingId,
});

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSpotBookings(data));
    return data;
  }
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/current`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getUserBookings(data.Bookings));
    return data;
  }
};


export const createBookingsThunk = (booking, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createBookings(data));
    return data;
  }
};

export const deleteBookingsThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteBookings(bookingId));
  }
};

const initialState = {
  spot: {},
  user: {},
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BOOKINGS: {
      if (action.payload) {
        const newUserBookings = {};
        action.payload.forEach((booking) => {
          newUserBookings[booking.id] = booking;
        });
        return { ...state, user: newUserBookings };
      }
      return state;
    }
    case GET_SPOT_BOOKINGS: {
      const newSpotBookings = {};
      action.payload.forEach((booking) => {
        newSpotBookings[booking.id] = booking;
      });
      return { ...state, spot: newSpotBookings };
    }
    case CREATE_BOOKINGS: {
      const newBooking = action.payload;
      return {
        ...state,
        user: { ...state.user, [newBooking.id]: newBooking },
      };
    }
    case DELETE_BOOKINGS: {
      const {
        [action.payload]: deletedBooking,
        ...newUserBookings
      } = state.user;
      return { ...state, user: newUserBookings };
    }
    default:
      return state;
  }
};

export default bookingReducer;
