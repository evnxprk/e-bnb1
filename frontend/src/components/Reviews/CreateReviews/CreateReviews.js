import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createReviewsThunk } from "../../../store/review-reducer";


const CreateReviews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  console.log("what the fuck is spotId: ", spotId)
  const {closeModal} = useModal()

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [validationError, setValidationError] = useState([]);
//   const currentSpot = Object.values(state => state.spots.allSpots)

//   console.log("this is the current spot: ", currentSpot)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (validationError.length) return;
    const newReview = {
        review, 
        stars,
    }

    await dispatch(createReviewsThunk(newReview, spotId));
    history.push('/')
    // closeModal()
  };
  return (
    <form className="create-review-form" onSubmit={handleSubmit}>
      <ul className="errors">
        {validationError.length > 0 &&
          validationError.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <h3>How was your stay? </h3>
      <label id="review-input-title">Reviews</label>
      <input
        id="review-form-inputs"
        type="text"
        name="review"
        placeholder="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <label id="review-input-title">Stars</label>
      <input
        id="rating-form-inputs"
        type="text"
        name="star"
        placeholder="Rating"
        value={stars}
        onChange={(e) => setStars(e.target.value)}
      />
      <button className="create-reviews-submit" type="submit">
        Create Review
      </button>
    </form>
  );
};

export default CreateReviews;
