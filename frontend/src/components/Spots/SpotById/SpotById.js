import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk, removeSpotThunk } from "../../../store/spot-reducer";
import { useParams, useHistory, NavLink } from "react-router-dom";
import "./SpotById.css";
import AllReviews from "../../Reviews/AllReviews/AllReviews";
import CreateReviews from "../../Reviews/CreateReviews/CreateReviews";
// import AllReviews from '../../Reviews/AllReviews/AllReviews'
import Bookings from "./booking";


import {
  deleteReviewsThunk,
  getAllReviewsThunk,
} from "../../../store/review-reducer";

const MySpot = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const { reviewId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.singleSpot);
  const spots = Object.values(spot);
  const reviews = useSelector((state) => state.review);
  // const allReviews = Object.values(reviews);
  const allReviews = reviews ? Object.values(reviews) : [];
  // const [randomNumber, setRandomNumber] = useState(2);
  // console.log("the sessionUser: ", sessionUser)
  console.log("what is appearing here in allReviews?????", allReviews);
  // console.log("what is appearing here in reviews?????", reviews);
  console.log("need ownerId: ", spot);
  console.log('reviews', allReviews)
  // console.log('this', reviews)
  // console.log('x', useSelector((state) => state))
  // const review = useSelector(state => state.reviews.userReview)
  // console.log("i need stars: ", reviews)
  // console.log("i need spots: ", spots);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
      dispatch(getAllReviewsThunk(spotId));
    // setRandomNumber(Math.floor(Math.random() * 10));
  }, [dispatch, spotId]);

  // useEffect(() => {
  // }, [dispatch]);

  if (!spots.length) return null;

  const spotRemoval = async (e) => {
    e.preventDefault();
    await dispatch(removeSpotThunk(spotId));
    history.push("/");
  };

  const refreshPage = async () => {
    await dispatch(getAllReviewsThunk(spotId));
    await dispatch(getOneSpotThunk(spotId));
  };

  let hasReview = false
  if (allReviews.length && sessionUser) {
    allReviews.forEach((review) => {
      if (review.userId === sessionUser.id) {
        hasReview = true
      }
    });
  }
  return (
    <div className="spot-details-container">
      <div className="spots-description">
        <div className="spot-name">{spot.name}</div>
        <div className="review-location-container">
          <div className="review-count">
            <div className="location-details">
              <i class="far fa-star"></i>
              {spot.avgStarRating} ∙ {spot.numReviews} reviews ∙
              <i class="fas fa-award"></i> Superhost ∙ {spot.city}, {spot.state}{" "}
              {spot.country} ∙ ${spot.price} per night
            </div>
          </div>
          <div className="owner-spot-buttons">
            <div className="edit-spot-button">
              {sessionUser && sessionUser.id === spot.ownerId ? (
                <NavLink to={`/manage/${spotId}`}>
                  <button className="edit-spot-button">Edit Spot</button>
                </NavLink>
              ) : null}
            </div>
            <div className="delete-spot">
              {sessionUser && sessionUser.id === spot.ownerId ? (
                <button className="delete-spot" onClick={(e) => spotRemoval(e)}>
                  Delete Spot
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {spot.SpotImages.map((image, idx) => {
          if (image.preview === true)
            return <img className="spot-image" src={image.url}></img>;
        })}
        {spot.SpotImages.map((image, idx) => {
          if (image.preview === false)
            return <img className={`spot-images-${idx}`} src={image.url}></img>;
        })}
      </div>
      <div className="owner-container">
        <div className="entire-home-description">
          {" "}
          Entire home hosted by {spot.Owner.firstName}
        </div>

        <span className="house-stats">
          {" "}
          8 guests ∙ 3 bedrooms ∙ 3 beds ∙ 3 baths{" "}
        </span>
        <div className="spots-description">{spot.description}</div>
      </div>

      <div className="superhost">
        <div className="owner-superhost">
          {" "}
          {spot.Owner.firstName} is a Superhost
        </div>
        <span className="superhost-meaning">
          Superhosts are experienced, highly rated hosts who are committed to
          providing great stays for guests.{" "}
        </span>
      </div>
      <div className="basic-things-about-home">
        <ul className="check-in">
          <i className="fas fa-lock"></i>Self Checkin
        </ul>
        <ul className="checkin-description">
          Check yourself in with the keypad.
        </ul>
        <ul className="location">
          <i className="fas fa-home"></i>Great Location
        </ul>
        <ul className="location-description">
          100% of recent guests gave the location a 5-star rating.
        </ul>
        <ul className="cancellation">
          <i class="fas fa-key"></i>Free cancellations for 48 hours
        </ul>
      </div>
      <div className="description-container">
        <div className="cancellations-notice"></div>
        <img
          className="air-cover-logo"
          src="https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg"
        ></img>
        <div className="aircover-guarantee">
          Every booking includes free protection from Host cancellations,
          listing inaccuracies, and other issues like trouble checking in.
        </div>
      </div>
      <div className="amenities-list" style={{borderBottom: '1px gray solid'}}>
        <div className="box-one">
          <div className="house-amenities">What this place offers:</div>
          <div className="kitchen">
            <i className="fas fa-utensils"></i>Kitchen
          </div>
          <p></p>
          <div className="parking">
            <i className="fas fa-car"></i>Free Parking{" "}
          </div>
          <p></p>
          <div className="pool">
            <i className="fas fa-swimming-pool"></i>Swimming Pool
          </div>
          <p></p>
          <div className="beach">
            <i className="fas fa-umbrella-beach"></i>Beach Access
          </div>
          <p></p>
          <div className="tv">
            <i className="fas fa-tv"></i>Smart TV
          </div>
          <p></p>
          <div className="wifi">
            <i className="fas fa-wifi"></i>Fast Internet
          </div>
          <div className="shower">
            <i className="fas fa-shower"></i>Shower
          </div>
          <div className="ac">
            <i className="fas fa-wind"></i> Air Conditioner
          </div>
        </div>
        <div className="box-two">
          <Bookings />
        </div>
      </div>
      <div className="review-container">
        <div className="review-count-container">
          <div className="reviews-total">
            <div className="all-reviews-container">
              <i className="fas fa-star"></i> {spot.avgStarRating} ∙
              {spot.numReviews} Reviews
            </div>
          </div>
        </div>
        <div className="review-spot">
          {sessionUser &&
          sessionUser.id !== spot.ownerId &&
          hasReview === false ? (
            <NavLink to={`/create/${spot.id}`}>
              <button className="review-spot-button">Review Spot</button>
            </NavLink>
          ) : null}
        </div>
        <div className="all-reviews">
          <div className="double-cards">
            {allReviews.map((review) => {
              const reviewUser = review.User || {};
              return (
                <div className="all-reviews">
                  <div className="session-name">
                    <span className="review-user">
                      <i className="fas fa-user-circle"></i>
                      {/* {review.User.firstName} */}
                      {reviewUser.firstName}
                    </span>
                    <p></p>
                    <span className="review-stars">
                      Rating: <i className="fas fa-star"></i> {review.stars}
                    </span>
                    <p></p>
                    <span className="reviews-overview">
                      Review: {review.review}
                    </span>
                    <div className="delete-review">
                      {sessionUser && sessionUser.id === review.userId ? (
                        <button
                          className="delete-review-button"
                          onClick={async (e) => {
                            e.preventDefault();
                            const deleteReview = await dispatch(
                              deleteReviewsThunk(review.id)
                            );
                            refreshPage();
                          }}
                        >
                          Delete Review
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySpot;
