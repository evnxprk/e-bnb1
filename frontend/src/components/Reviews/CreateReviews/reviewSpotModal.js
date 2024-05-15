import React from "react";
import "./CreateReviews.css";

const CreateReviewModal = ({ onSubmit, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData);
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            placeholder="Type your review here"
            required
          />
          <label htmlFor="stars">Stars</label>
          <select id="stars" name="stars" required>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
          <div className="button-group">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReviewModal;
