import React, { useState } from "react";
import CreateReviewModal from "./reviewSpotModal";
import "./CreateReviews.css";

const CreateReviews = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (formData) => {
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Close the modal after submission
    setModalOpen(false);
  };

  return (
    <div className="create-reviews">
      <button onClick={handleOpenModal}>Create Review</button>
      {modalOpen && (
        <CreateReviewModal onSubmit={handleSubmit} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CreateReviews;
