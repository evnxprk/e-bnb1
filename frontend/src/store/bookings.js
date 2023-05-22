import { csrfFetch } from "./csrf";

const GET_SPOT_BOOKINGS = "bookings/GET_SPOT_BOOKINGS";
const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";
const CREATE_BOOKINGS = "bookings/CREATE_BOOKINGS";
const EDIT_BOOKINGS = "bookings/EDIT_BOOKINGS";
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

const editBookings = (booking) => ({
  type: EDIT_BOOKINGS,
  payload: booking,
});

const deleteBookings = (booking) => ({
  type: DELETE_BOOKINGS,
  payload: booking,
});

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`api/spots/${spotId}/bookings`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSpotBookings(data));
    return data;
  }
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`api/bookings/current`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserBookings(data));
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

export const editBookingsThunk = (booking, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`api/bookings/${bookingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editBookings(data));
  }
};

export const deleteBookingsThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBookings(data));
  }
};

//reducer
const initialState = {};

export const bookingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_USER_BOOKINGS: {
      action.booking.Bookings.forEach((booking) => {
        newState[booking.id] = { ...newState[booking.id], ...booking };
      });
      return newState;
    }
    case GET_SPOT_BOOKINGS: {
      action.booking.Bookings.forEach((booking) => {
        newState[booking.id] = { ...newState[booking.id], ...booking };
      });
      return newState;
    }
    case CREATE_BOOKINGS: {
      newState[action.booking.id] = action.booking;
      return newState;
    }
    case EDIT_BOOKINGS: {
      newState[action.booking.id] = {
        ...newState[action.booking.id],
        ...action.booking,
      };
      return newState;
    }
    case DELETE_BOOKINGS: {
      delete newState[action.booking];
      return newState;
    }
    default:
      return newState;
  }
};
