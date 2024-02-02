// EditReviewModal.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editReviewsThunk } from "../../../store/review-reducer";
import { useModal } from "../../../context/Modal";
import "./editreviews.css"; // Import your CSS file for styling

function EditReviewModal({ reviewId, onClose }) {
  const dispatch = useDispatch();
  const [editedReview, setEditedReview] = useState(""); // Add state for edited review text

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Perform your logic to update the review in the backend
    dispatch(editReviewsThunk({ review: editedReview }, reviewId));
    onClose(); // Close the modal after editing
  };

  return (
    <div className="edit-review-modal">
      <h2>Edit Review</h2>
      <form onSubmit={handleEditSubmit}>
        <textarea
          value={editedReview}
          onChange={(e) => setEditedReview(e.target.value)}
          placeholder="Edit your review..."
          rows={4}
          cols={50}
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditReviewModal;
