import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const USER_REVIEWS = "reviews/USER_REVIEWS";

// Action Creators
const getAllReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const allReviews = await response.json();
    dispatch(getAllReviews(allReviews.Reviews));
  }
};

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

export const createReviewsThunk = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createReview(data));
    return data;
  }
};

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
});

export const editReviewsThunk = (review, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editReview(data));
  }
};

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const deleteReviewsThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
};

const getUserReviews = (reviews) => ({
  type: USER_REVIEWS,
  reviews,
});

export const getUserReviewsThunk = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/current`);
    if (!response.ok) {
      throw new Error("Failed to fetch user reviews");
    }
    const data = await response.json();
    console.log("Fetched user reviews:", data); // Log fetched data
    dispatch(getUserReviews(data.Reviews));
  } catch (error) {
    console.error("Error fetching user reviews:", error);
  }
};


const initialState = {
  user: {},
};

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_REVIEWS:
      return { ...state, all: action.reviews };

    case USER_REVIEWS: {
      return {
        ...state,
        user: action.reviews,
      };
    }

    case CREATE_REVIEW:
      newState.user[action.review.id] = action.review;
      return newState;

    case EDIT_REVIEW:
      newState.user[action.review.id] = action.review;
      return newState;

    case DELETE_REVIEW:
      delete newState.user[action.id];
      return newState;

    default:
      return newState;
  }
};

export default reviewReducer;
