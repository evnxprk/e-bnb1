import { csrfFetch } from "./csrf";

const GET_SPOTS = "/spots/getSpots";
const CREATE_SPOT = "/spots/createSpot";
const EDIT_SPOT = "/spots/editSpot";
const DELETE_SPOT = "/spots/deleteSpot";
const ONE_SPOT = "/spots/oneSpot";
// const CREATE_IMAGE = '/spots/createImage'

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
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const data = await response.json();
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

// const createImage = (spotId) => {
//   return {
//     type: CREATE_IMAGE,
//     spotId,
//   };
// };

// export const createImageThunk = (spotId, imageURL) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//     method: "POST",
//     body: JSON.stringify(imageURL),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(createImage(data));
//     return response;
//   }
// };

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
      newState[action.payload.id] = action.payload;

      //return the copy
      return newState;
    }
    case EDIT_SPOT: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    // case CREATE_IMAGE: {
    //   const newState = { ...state };
    //   return newState;
    // }
    default:
      return state;
  }
};

export default spotsReducer;
