import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editReviewsThunk } from "../../../store/review-reducer";
import { useModal } from "../../../context/Modal";
import "./editreviews.css";

function EditReviewModal({ reviewId, onClose }) {
  const dispatch = useDispatch();
  const [editedReview, setEditedReview] = useState(""); // State to track edited review text

  const handleEditReview = () => {
    // Dispatch the editReviewsThunk with the updated review text
    dispatch(editReviewsThunk({ review: editedReview }, reviewId));
    // Close the modal after editing
    onClose();
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
