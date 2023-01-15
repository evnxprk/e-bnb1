import {csrfFetch} from "./csrf";

const GET_SPOTS = "/spots/GET_SPOTS";
const GET_SPOT_ID = "/spots/getSpotId";
const CREATE_SPOT = "/spots/createSpot";
const EDIT_SPOT = "/spots/editSpot";
const DELETE_SPOT = "/spots/deleteSpot";
const CREATE_IMAGE = "/spots/createImage";

const normalizedData = (data) => {
  const res = {}
  data.forEach(el => {
    res[el.id] = el
    return res
  })
}
//action create

const retrieveSpot = (spots) => {
   return {
    type: GET_SPOTS,
    spots
  }
}

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch ("/api/spots");
  // console.log(response)

  if (response.ok) {
    const data = await response.json();
    // console.log(data)
    const normalData = normalizedData(data.Spots)
    dispatch(retrieveSpot(normalData));
    return data.Spots;
  }
};

const retrieveSpotId = (spots) => {
  return {
    type: GET_SPOT_ID,
    spots,
  };
};

export const getSpotIdThunk = (spots) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spots}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(retrieveSpotId(data));
    return data;
  }
};

const createSpot = (spots) => {
  return {
    type: CREATE_SPOT,
    spots,
  };
};

export const createSpotThunk = (spots) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spots.id}`, {
    method: "POST",
    body: JSON.stringify(spots),
  });

  if (response.ok) {
    const data = response.json();
    dispatch(createSpot(data));
    return data;
  }
};

const updateSpot = (spots) => {
  return {
    type: EDIT_SPOT,
    spots,
  };
};

export const updateSpotThunk = (spots) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spots.id}`, {
    method: "PUT",
    body: JSON.stringify(spots),
  });

  if (response.ok) {
    const data = response.json();
    dispatch(updateSpot(data));
    return response;
  }
};

const removeSpot = (spots) => {
  return {
    type: DELETE_SPOT,
    spots,
  };
};

export const removeSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeSpot(data));
    return response;
  }
};

const createImage = (spotId) => {
  return {
    type: CREATE_IMAGE,
    spotId,
  };
};

export const createImageThunk = (spotId, imageURL) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify(imageURL),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createImage(data));
    return response;
  }
};

//reducer 

const initialState = { AllSpots: {}, OneSpot: {} }
const spotsReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_SPOTS: {
      newState.AllSpots = action.spots
      return newState;
    }

    case GET_SPOT_ID: {
      const newState = { ...state, oneSpot: action.spot };
      return newState;
    }
    case CREATE_SPOT: {
      const newState = { ...state };
      return newState;
    }
    case EDIT_SPOT: {
      const newState = { ...state };
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState.Spot[action.spotId];
      delete newState.OneSpot;
      return newState;
    }
    case CREATE_IMAGE: {
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;

