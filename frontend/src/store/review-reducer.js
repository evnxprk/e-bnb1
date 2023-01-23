import { csrfFetch } from "./csrf";
const GET_REVIEWS = "/reviews/getReviews";
const CREATE_REVIEWS = "/reviews/createReviews";
const DELETE_REVIEWS = "/reviews/deleteReviews";

// action creator
// action creator
const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const response = await fetch (`/api/spots/${spotId}/reviews`) 

    if(response.ok) {
        const allReviews = await response.json()
        let obj = {}
        allReviews.Reviews.forEach(review => {
            obj[review.id] = review
        });
        dispatch(getReviews(obj))
        return obj.Reviews
    }
}


const createReviews = (review) => {
    return { 
        type: CREATE_REVIEWS,
        review
    }
}

export const createReviewsThunk = (review,spotId) => async () => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    // dispatch(createReviews(spotId));
    return data;
  }
};


const deleteReviews = (id) => {
    return {
        type: DELETE_REVIEWS,
        id
    }
}

export const deleteReviewsThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(deleteReviews(data))
        return data;
    }
};

// reducer 
const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = { ...state }

    switch (action.type) {
      case GET_REVIEWS: {
        newState = action.reviews
        return newState;
      }
      case CREATE_REVIEWS: {
        newState = { ...state }
        newState[action.review.id] = action.review
        return newState
      }
      case DELETE_REVIEWS: {
        newState = { ...state }
        delete newState[action.spotId]
        return newState
      }
      default:
        return newState;
    }
}

export default reviewReducer;

