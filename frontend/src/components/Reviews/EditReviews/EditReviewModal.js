import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewsThunk } from "../../../store/review-reducer";
import "./editreviews.css";

function EditReviewModal({ reviewId, onClose }) {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.review.user[reviewId]);
  const [editedReview, setEditedReview] = useState("");

  useEffect(() => {
    if (review) {
      setEditedReview(review.text);
    }
  }, [review]);

  const handleEditReview = () => {
    if (editedReview.trim()) {
      dispatch(editReviewsThunk({ review: editedReview }, reviewId));
      onClose();
    }
  };

  return (
    <div className="edit-review-modal">
      <h2>Edit Review</h2>
      <textarea
        className="edit-review-textarea"
        placeholder="Edit your review..."
        value={editedReview}
        onChange={(e) => setEditedReview(e.target.value)}
      />
      <div className="edit-review-buttons">
        <button className="edit-review-save" onClick={handleEditReview}>
          Save
        </button>
        <button className="edit-review-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditReviewModal;
