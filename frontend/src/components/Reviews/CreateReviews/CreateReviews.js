import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { createReviewsThunk } from "../../../store/review-reducer";
import "./CreateReviews.css";

const CreateReviews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // console.log("what the fuck is spotId: ", spotId);
  // const { closeModal } = useModal();
  const minVal = 1;
   const maxVal = 5;

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState([]);
  //   const currentSpot = Object.values(state => state.spots.allSpots)

  //   console.log("this is the current spot: ", currentSpot)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stars < minVal || stars > maxVal ) {
      setErrors(['Rating must be between 1 and 5']);
      return;
    }
    setErrors([]);

    // if (validationError.length) return;
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
   if(myReview) history.push(`/spots/${spotId}`);
    // closeModal()
  };
  return (
    <div className="review-form">
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
        <input
          id="rating-form-inputs"
          type="text"
          name="star"
          placeholder="Rating"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
        <button className="create-reviews-submit" type="submit">
          Create Review
        </button>
      </form>
    </div>
  );
};

export default CreateReviews;
