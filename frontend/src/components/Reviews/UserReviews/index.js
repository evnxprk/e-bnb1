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

  const handleDeleteReview = async (reviewId) => {
    await dispatch(deleteReviewsThunk(reviewId));
    // After deletion, refetch the user's reviews to update the UI
    dispatch(getUserReviewsThunk());
  };

  const handleEditReview = (reviewId) => {
    if (setShowModal) {
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
            <div>
              <p>{review.review}</p>
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
          </div>
        ))
      ) : (
        <div>You have no reviews.</div>
      )}
      {showModal && showModal.editReviewId && (
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
