// UserReviews.js

// ... (other imports)

function UserReviews() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const { closeModal, showModal, setShowModal } = useModal(); // Add setShowModal from useModal hook

  const userReviews = useSelector((state) => state.review.user);

  useEffect(() => {
    dispatch(getUserReviewsThunk()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }, [dispatch, setErrors]);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviewsThunk(reviewId));
  };

  const handleEditReview = (reviewId) => {
    // Pass the reviewId directly to setShowModal
    setShowModal((prev) => ({ ...prev, editReviewId: reviewId }));
  };

  if (!userReviews) {
    return null;
  }

  return (
    <div className="my-reviews">
      {/* ... (other JSX) */}

      {Object.values(userReviews).length ? (
        Object.values(userReviews).map((review) => (
          <div className="my-reviews-card-div" key={review.id}>
            {/* ... (other JSX) */}
            <button
              className="edit-review-button"
              onClick={() => handleEditReview(review.id)}
            >
              Edit Review
            </button>
            {/* ... (other JSX) */}
          </div>
        ))
      ) : (
        <div>You have no reviews.</div>
      )}
      {/* Render the EditReviewModal component when the modal is open */}
      {showModal.editReviewId && (
        <EditReviewModal
          reviewId={showModal.editReviewId}
          onClose={() =>
            setShowModal((prev) => ({ ...prev, editReviewId: null }))
          }
        />
      )}
    </div>
  );
}

export default UserReviews;
