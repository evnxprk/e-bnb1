import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserReviewsThunk,
  deleteReviewsThunk,
} from "../../../store/review-reducer";
import { useModal } from "../../../context/Modal";
import "./myreviews.css";
import EditReviewModal from "../EditReviews/EditReviewModal";

function UserReviews() {
  const dispatch = useDispatch();
  const { showModal, setShowModal } = useModal();
  const userReviews = useSelector((state) => state.review.user);
  const spots = useSelector((state) => state.spots); // Assuming you have spots in your state
  const user = useSelector((state) => state.session.user); // Access session user
  console.log("user: ", user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserReviewsThunk())
      .then(() => setLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        console.error("Error fetching user reviews:", data.errors);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-reviews">
      {userReviews && userReviews.length > 0 ? (
        userReviews.map((review) => {
          const spot = spots[review.spotId]; // Get spot details from spots state
          if (!spot) return null; // If spot details not available, skip rendering
          return (
            <div className="my-reviews-card-div" key={review.id}>
              <p className="spot-name">{spot.name}</p>
              <p className="username-says">{user.firstName} says... </p>
              <p className="review-text">Review: {review.review}</p>
            </div>
          );
        })
      ) : (
        <div>You have no reviews.</div>
      )}
    </div>
  );
}

export default UserReviews;
