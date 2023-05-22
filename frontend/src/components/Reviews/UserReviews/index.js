import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviewsThunk } from "../../../store/review-reducer";
import { useModal } from "../../../context/Modal";

function UserReviews() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const userReviews = useSelector((state) => state.review.user);

  useEffect(() => {
    dispatch(getUserReviewsThunk()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }, [dispatch, setErrors]);

  if (!userReviews) {
    return null;
  }

  return (
    <div className="my-Reviews">
      <div className="my-reviews-header-div">
        <h1>My Reviews</h1>
      </div>
      <div className="my-reviews-modal-div">
        {Object.values(userReviews).length ? (
          Object.values(userReviews).map((review) => (
            <div className="my-reviews-card-div" key={review.id}>
              <div>{review.review}</div>
              <div>{review.stars}</div>
            </div>
          ))
        ) : (
          <div>You have no reviews.</div>
        )}
      </div>
    </div>
  );
}

export default UserReviews;
