import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createReviewsThunk } from "../../../store/review-reducer";
import "./CreateReviews.css";

const CreateReviews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState([]);

  const handleStarChange = (e) => {
    setStars(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation checks
    if (stars < 1 || stars > 5) {
      setErrors(["Rating must be between 1 and 5"]);
      return;
    }
    if (!review.trim()) {
      setErrors(["Review cannot be left empty."]);
      return;
    }

    setErrors([]);

    const newReview = {
      review,
      stars,
    };

    let myReview = await dispatch(createReviewsThunk(newReview, spotId)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (myReview) history.push(`/spots/${spotId}`);
  };

  return (
    <div className="create-reviews-modal">
      <form className="create-review-form" onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.length > 0 &&
            errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <h3>How was your stay? </h3>
        <label className="review-input-title">Reviews</label>
        <input
          id="review-form-inputs"
          type="text"
          name="review"
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <label className="review-input-title">Stars</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating}>
              <input
                type="radio"
                name="stars"
                value={rating}
                checked={rating === stars}
                onChange={handleStarChange}
              />
              <span className={`star ${rating <= stars ? "filled" : ""}`}>
                &#9733;
              </span>
            </label>
          ))}
        </div>
        <button className="create-reviews-submit" type="submit">
          Create Review
        </button>
      </form>
    </div>
  );
};

export default CreateReviews;
