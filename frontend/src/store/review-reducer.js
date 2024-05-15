import { csrfFetch } from "./csrf";
const GET_REVIEWS = "/reviews/GET_REVIEWS";
const CREATE_REVIEWS = "/reviews/CREATE_REVIEWS";
const DELETE_REVIEWS = "/reviews/DELETE_REVIEWS";
const EDIT_REVIEWS = '/reviews/EDIT_REVIEWS';
const USER_REVIEWS = "/reviews/USER_REVIEWS";

// action creator
// action creator
const getAllReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const allReviews = await response.json();
    dispatch(getAllReviews(allReviews.Reviews));
  }
};

const createReviews = (review) => {
  return {
    type: CREATE_REVIEWS,
    review,
  };
};

export const createReviewsThunk = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createReviews(spotId));
    return data;
  }
};

 const editReviews = (review) => {
  return {
    type: EDIT_REVIEWS,
    review
  }
}

export const editReviewsThunk = (review, reviewId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      // Handle error if the request fails
      throw response;
    }
    const data = await response.json();
    dispatch(editReviews(data));
  } catch (error) {
    // Handle errors here, e.g., dispatch an action to update state with error information
    console.error("Error editing review:", error);
  }
};


const deleteReviews = (id) => {
  return {
    type: DELETE_REVIEWS,
    id,
  };
};

export const deleteReviewsThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReviews(data));
    return data;
  }
};
const getUserReviews = (reviewId) => ({
  type: USER_REVIEWS,
  reviewId,
});

export const getUserReviewsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/current`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserReviews(data.Reviews));
  }
  return response;
};
// reducer
const initialState = {
  user: {},
};


const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_REVIEWS: {
      newState = action.reviews;
      return newState;
    }
    case USER_REVIEWS: {
      return {
        ...state,
        user: action.reviewId,
      };
    }
    case CREATE_REVIEWS: {
      newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    }
    case EDIT_REVIEWS: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case DELETE_REVIEWS: {
      newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return newState;
  }
};

export default reviewReducer;
