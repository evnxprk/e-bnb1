// UserReviews.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserReviewsThunk,
  deleteReviewsThunk,
} from "../../../store/review-reducer";
import { useModal } from "../../../context/Modal";
import "./myreviews.css";
import EditReviewModal from ""; // Import the modal for editing reviews

function UserReviews() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal, showModal, setShowModal } = useModal(); // Add setShowModal from useModal hook

  const userReviews = useSelector((state) => state.review.user);

  useEffect(() => {
    dispatch(getUserReviewsThunk()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }, [dispatch, setErrors]);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewsThunk(reviewId));
  };

  const handleEditReview = (reviewId) => {
    setShowModal(true);
    // Save the reviewId to state or pass it directly to EditReviewModal
    // I'll pass it directly in this example
    setShowModal({ reviewId });
  };

  if (!userReviews) {
    return null;
  }

  return (
    <div className="my-reviews">
      <div className="my-reviews-header-div">
        <h1>
          My Reviews <i className="fas fa-pencil-alt"></i>
        </h1>
      </div>
      <div className="my-reviews-modal-div">
        {Object.values(userReviews).length ? (
          Object.values(userReviews).map((review) => (
            <div className="my-reviews-card-div" key={review.id}>
              <div className="review-place">Place: {review.Spot.name}</div>
              <div className="review-text">Review: {review.review}</div>
              <div className="review-stars">Stars: {review.stars}</div>
              <button
                className="edit-review-button"
                onClick={() => handleEditReview(review.id)}
              >
                Edit Review
              </button>
              <button
                className="delete-review-button"
                onClick={() => handleDeleteReview(review.id)}
              >
                Delete Review
              </button>
            </div>
          ))
        ) : (
          <div>You have no reviews.</div>
        )}
      </div>
      {/* Render the EditReviewModal component when the modal is open */}
      {showModal && <EditReviewModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default UserReviews;
