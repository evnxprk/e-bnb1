import { csrfFetch } from "./csrf";

const GET_SPOTS = "/spots/GET_SPOTS";
const CREATE_SPOT = "/spots/CREATE_SPOT";
const EDIT_SPOT = "/spots/EDIT_SPOT";
const DELETE_SPOT = "/spots/DELETE_SPOT";
const ONE_SPOT = "/spots/ONE_SPOT";
const CURRENT_SPOTS = '/spots/CURRENT_SPOTS'

const normalizeData = (data) => {
    const normalizedData = {}
    for (let spotData of data) {
        normalizedData[spotData.id] = spotData
    }
    return normalizedData
}

//action create

const getSpots = (allSpots) => {
  return {
    type: GET_SPOTS,
    allSpots,
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
  const response = await csrfFetch('/api/spots', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(spotFormInfo),
  });

  if (response.ok) {
    const data = await response.json();
    return data
  }
};

export const createImageThunk = (img, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(img)
  });

  if(response.ok) {
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
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(oneSpot),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateSpot(data));
  }
};

const removeSpot = (spot) => {
  return {

    type: DELETE_SPOT,
    spot,
  };
};

export const removeSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeSpot(data));
    return data;
  }
};

export const getCurrentUserSpots = (userSpot) => {
  return {
    type: CURRENT_SPOTS,
    userSpot,
  };
};

export const thunkCurrentUsersSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const data = await response.json();
    dispatch(getCurrentUserSpots(data.Spots));
    return data;
  }
};

//reducer
const initialState = { allSpots: {}, singleSpot: {} };

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
    case CURRENT_SPOTS: {
      let newState = Object.assign({}, state);

      const userSpots = normalizeData(action.userSpot);
      newState = userSpots;
      return newState;
    }
    case EDIT_SPOT: {
      newState = { ...state };
      newState[action.oneSpot.id] = action.oneSpot;
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
