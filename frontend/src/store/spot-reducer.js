import { csrfFetch } from "./csrf";

const GET_SPOTS = "/spots/GET_SPOTS";
const READ_SPOTS = "/spots/READ";
const CREATE_SPOT = "/spots/CREATE_SPOT";
const EDIT_SPOT = "/spots/EDIT_SPOT";
const DELETE_SPOT = "/spots/DELETE_SPOT";
const ONE_SPOT = "/spots/ONE_SPOT";
// const CURRENT_SPOTS = "/spots/CURRENT_SPOTS";

const getSpots = (allSpots) => {
  return {
    type: GET_SPOTS,
    allSpots,
  };
};

export const actionReadSpots = (spots) => {
  return {
    type: READ_SPOTS,
    spots,
  };
};

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const allSpots = await response.json();
    dispatch(getSpots(allSpots.Spots));
  }
};

const oneSpot = (spot) => {
  return {
    type: ONE_SPOT,
    spot,
  };
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(oneSpot(data));
  }
};

const createSpot = (spots) => {
  return {
    type: CREATE_SPOT,
    spots,
  };
};

export const createSpotThunk = (spotFormInfo) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotFormInfo),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const createImageThunk = (img, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(img),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const updateSpot = (oneSpot) => {
  return {
    type: EDIT_SPOT,
    oneSpot,
  };
};

export const updateSpotThunk = (oneSpot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(oneSpot),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateSpot(data));
  }
};

const removeSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

export const readThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(actionReadSpots(spots));
  }
};

export const removeSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeSpot(data.spotId));
    return data;
  }
};

// const getCurrentUserSpots = (userSpot) => {
//   return {
//     type: CURRENT_SPOTS,
//     userSpot,
//   };
// };

// export const getCurrentUserSpotsThunk = () => async (dispatch) => {
//   const response = await csrfFetch("/api/spots/current");
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(getCurrentUserSpots(data.Spots));
//     return data.Spots;
//   }
// };



const initialState = { allSpots: {}, singleSpot: {}, currentUserSpots: {} };

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_SPOTS: {
      newState.allSpots = action.allSpots;
      return newState;
    }

    case ONE_SPOT: {
      newState.singleSpot = action.spot;
      return newState;
    }

    case EDIT_SPOT: {
      newState[action.oneSpot.id] = action.oneSpot;
      return newState;
    }

    case DELETE_SPOT: {
      delete newState[action.spotId];
      return newState;
    }

    // case CURRENT_SPOTS: {
    //   newState.currentUserSpots = action.userSpot;
    //   return newState;
    // }

    case READ_SPOTS: {
      let newState = Object.assign({}, state);
      for (let spot of action.spots.Spots) {
        newState[spot.id] = spot;
      }
      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;
