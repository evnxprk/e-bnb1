import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk, removeSpotThunk } from "../../../store/spot-reducer";
import { useParams, useHistory, NavLink } from "react-router-dom";
import "./SpotById.css";
import AllReviews from "../../Reviews/AllReviews/AllReviews";
import CreateReviews from "../../Reviews/CreateReviews/CreateReviews";
// import AllReviews from '../../Reviews/AllReviews/AllReviews'
import {
  deleteReviewsThunk,
  getAllReviewsThunk,
} from "../../../store/review-reducer";

const MySpot = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const { reviewId } = useParams();
  // const [randomNumber, setRandomNumber] = useState(2);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  //   console.log("the sessionUser: ", sessionUser)
  const spot = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews);
  const allReviews = Object.values(reviews);
  // console.log("what is appearing here in allReviews?????", allReviews);
  // console.log("what is appearing here in reviews?????", reviews);
  console.log("need ownerId: ", spot);
  // const review = useSelector(state => state.reviews.userReview)

  const spots = Object.values(spot);

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
    // setRandomNumber(Math.floor(Math.random() * 10));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch]);

  if (!spots.length) return null;

  const spotRemoval = async (e) => {
    e.preventDefault();
    await dispatch(removeSpotThunk(spot.id));
    history.push("/");
  };

  return (
      
      <div className="page-idk">
        <div className="idk">
          <div className="entire-home-description">
            <div className="spot-name-middle">
              {spot.name} • {spot.city}, {spot.state} •{" "}
              <i class="far fa-star"></i>
              {spot.avgStarRating}
            </div>
            {spot.SpotImages.map((img) => (
              <div>
                <img
                  className="spot-image-by-id"
                  src={img.url}
                  alt="spot-by-id"
                />
              </div>
            ))}
            <p></p>
            <div className="edit-spot">
              {sessionUser && sessionUser.id === spot.ownerId ? (
                <NavLink to={`/manage/${spotId}`}>
                  <button className="edit-spot-button">Edit This Spot</button>
                </NavLink>
              ) : null}
            </div>
            <div className="spot-owner-name">
              Entire Home Hosted By {spot.Owner.firstName}
            </div>
            <h4> 10 guests | 7 bedrooms | 6 beds | 4 baths </h4>

            <div className="superhost-whoo">
              {" "}
              {spot.Owner.firstName} is a Superhost!
              <i className="fas fa-ribbon"></i>
            </div>
            <div className="superhost-meaning">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
              <p></p>
            </div>
            <p></p>
          </div>
          {/* </div> */}

          <div></div>
          {/* <div className="basic-things-about-home"> */}
          {/* <span className="check-in"> */}
          {/* <i className="fas fa-lock-open"></i> Self checkin */}
          {/* </span> */}
          {/* <span className="location"> */}
          {/* {" "} */}
          {/* <i className="fas fa-home"></i> Great Location */}
          {/* </span> */}
          {/* <span className="key"> */}
          {/* <i className="fas fa-key"></i> Great Checkins */}
          {/* </span> */}
          {/* </div> */}

          <div className="description-container">
            <h4 className="cancellations-notice">
              <img
                className="air-cover-logo"
                src="https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg"
              ></img>
              <p></p>
            </h4>
            <div className="aircover-guarantee">
              Every booking includes free protection from Host cancellations,
              listing inaccuracies, and other issues like trouble checking in.
            </div>

            <h4 className="offers">What this place offers:</h4>
            <div className="amenities-list">
              <li>Kitchen</li>
              <li>Free Parking</li>
              <li>Washer</li>
              <li>Dryer</li>
              <li>Bathtub</li>
              <li>Beach Access</li>
              <li>Wifi</li>
              <li>TV</li>
            </div>
          </div>

          <div className="button-container">
            <div className="delete-spot">
              {sessionUser && sessionUser.id === spot.ownerId ? (
                <button
                  className="delete-spot-button"
                  onClick={(e) => spotRemoval(e)}
                >
                  Delete This Spot
                </button>
              ) : null}{" "}
            </div>

            <div className="review-spot">
              {sessionUser && sessionUser.id !== spot.ownerId ? (
                <NavLink to={`/create/${spot.id}`}>
                  <button className="review-spot-button">
                    Review This Spot
                  </button>
                </NavLink>
              ) : null}
            </div>

              <h3> REVIEWS OF THIS HOME</h3>
            <div className="double-cards">
              {allReviews.map((review) => (
                <div className="all-reviews-container">
                  <div className="session-name">
                    What {review.User.firstName} thought of her experience: 
                    <p>
                    Rating: <i className="fas fa-star"></i> {review.stars}

                    </p>
                  <p className="reviews-overview">Review: {review.review} </p>
                    <div className="delete-this-review">
                      {sessionUser && sessionUser.id === review.userId ? (
                        <button
                          className="button-delete"
                          onClick={async (e) => {
                            e.preventDefault();
                            const reviewRemove = await dispatch(
                              deleteReviewsThunk(review.id)
                            );
                            if (reviewRemove) history.push("/");
                          }}
                        >
                          {" "}
                          Delete This Review
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="owner-contact">
        <ul>Hosted by {spot.Owner.firstName}</ul>
        <ul>During your stay:</ul>
        <ul>
          Please contact me with any questions or requests. 
        </ul>
        <ul>Response rate: 100% Response time: within an hour</ul>
      </div> */}
      </div>
    );
  }

export default MySpot;
