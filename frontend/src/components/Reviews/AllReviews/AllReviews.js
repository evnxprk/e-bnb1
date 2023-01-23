import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllReviewsThunk } from "../../../store/review-reducer";

const AllReviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotReviews = useSelector((state) => state.reviews.spotReviews);
  const reviews = Object.values(spotReviews)

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  // if (!reviews) return "Loading...";

  return (
    <div id="review-cards">
      {reviews.map((review) => (
        <div key={review.id} className="review-cards-container">
          <NavLink to={`reviews/${review.id}`} className="review-description">
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
