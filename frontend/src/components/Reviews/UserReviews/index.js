import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserReviewsThunk,
  deleteReviewsThunk,
} from "../../../store/review-reducer";
import { useModal } from "../../../context/Modal";
import "./myreviews.css";
import EditReviewModal from "../EditReviews/editmodal";

function UserReviews() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { showModal, setShowModal } = useModal();

  const userReviews = useSelector((state) => state.review.user);

  useEffect(() => {
    dispatch(getUserReviewsThunk()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }, [dispatch]);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewsThunk(reviewId));
  };

  const handleEditReview = (reviewId) => {
    if (setShowModal) {
      // Check if setShowModal is defined
      setShowModal((prev) => ({ ...prev, editReviewId: reviewId }));
    }
  };

  if (!userReviews) {
    return null;
  }

  return (
    <div className="my-reviews">
      {Object.values(userReviews).length ? (
        Object.values(userReviews).map((review) => (
          <div className="my-reviews-card-div" key={review.id}>
            <button
              className="edit-review-button"
              onClick={() => handleEditReview(review.id)}
            >
              Edit Review
            </button>
          </div>
        ))
      ) : (
        <div>You have no reviews.</div>
      )}
      {showModal &&
      showModal.editReviewId && ( // Check if showModal exists before accessing editReviewId
          <EditReviewModal
            reviewId={showModal.editReviewId}
            onClose={() =>
              setShowModal((prev) => ({ ...prev, editReviewId: null }))
            }
          />
        )}
    </div>
  );
}

export default UserReviews;
