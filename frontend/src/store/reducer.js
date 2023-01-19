import { csrfFetch } from "./csrf";

const GET_SPOTS = "/spots/getSpots";
const CREATE_SPOT = "/spots/createSpot";
const EDIT_SPOT = "/spots/editSpot";
const DELETE_SPOT = "/spots/deleteSpot";
const ONE_SPOT = "/spots/oneSpot";

//action create

const getSpots = (allSpots) => {
  return {
    type: GET_SPOTS,
    allSpots,
  };
};

export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  // console.log(response)

  if (response.ok) {
    const allSpots = await response.json();
    dispatch(getSpots(allSpots));
    return allSpots;
  }
};

const oneSpot = (spot) => {
  return {
    type: ONE_SPOT,
    spot,
  };
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  console.log("test spotId: ", spotId)
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
    console.log("testing one spot from db: ", data)
    dispatch(oneSpot(data));
    // return data;
  }
};

const createSpot = (spots) => {
  return {
    type: CREATE_SPOT,
    spots,
  };
};

export const createSpotThunk = (spots) => async (dispatch) => {
  const response = await csrfFetch('/api/spots/', {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(spots),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createSpot(data));
    return data;
  }
};

export const createImageThunk = (img, spotId) => async (dispatch) => {
  const response = await csrfFetch(`api/spots/${spotId}/images`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(img)
  })

  console.log("idk: ", spotId)

  if(response.ok) {
    const data = await response.json()
    return data
  }

}

const updateSpot = (spots) => {
  return {
    type: EDIT_SPOT,
    spots,
  };
};

export const updateSpotThunk = (oneSpot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(oneSpot),
  });

  if (response.ok) {
    const data = await response.json();
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
    return data;
  }
};

//reducer
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_SPOTS: {
      action.allSpots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }

    case ONE_SPOT: {
      newState.singleSpot = action.spot;
      return newState;
    }

    case CREATE_SPOT: {
      //mutate the copy
      newState[action.spots.id] = action.spots;
      //return the copy
      return newState;
    }
    case EDIT_SPOT: {
      newState = { ...state };
      newState[action.spots.id] = action.spots;
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
