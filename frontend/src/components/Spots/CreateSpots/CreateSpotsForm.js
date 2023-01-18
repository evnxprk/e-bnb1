import { useDispatch } from "react-redux";
import "./CreateSpotsForm.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { createSpotThunk } from "../../../store/reducer";

const CreateForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [validationError, setValidationError] = useState([]);

  //errors

  useEffect(() => {
    const errors = [];
    if (address.length === 0) {
      errors.push("Please provide a valid address.");
    }
    if (city.length === 0) {
      errors.push("Please provide a valid city.");
    }
    if (state.length === 0) {
      errors.push("Please provide a valid state.");
    }
    if (country.length === 0) {
      errors.push("Please provide a valid country.");
    }
    if (name.length === 0) {
      errors.push("Please provide a valid name.");
    }
    if (description.length === 0) {
      errors.push("Please provide a valid description.");
    }
    if (+price <= 0) {
      errors.push("Please provide a valid price.");
    }

    if (!imageURL) {
      errors.push("Please provide a valid URL");
    }
    setValidationError(errors);
  }, [address, city, state, country, name, price, description, imageURL]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationError.length) return;
    const spotFormInfo = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    };

    let spotCreated = await dispatch(createSpotThunk(spotFormInfo));
    if (spotCreated) {
      history.push(`/spots/${spotCreated.id}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="create-new-spot-form ">
        <h2>Begin Hosting</h2>
        <ul className="errors">
          { validationError.length > 0 &&
            validationError.map((error, idx) => (
              <li key={idx}>
                <i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}
              </li>
            ))}
        </ul>

        <label id="owner-input-title"> Address </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label id="owner-input-title"> City </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label id="owner-input-title"> State </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="state"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />

        <label id="owner-input-title"> Country </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <label id="owner-input-title"> Name </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="name"
          placeholder="Name of Spot"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label id="owner-input-title"> Description </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label id="owner-input-title"> Price </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="price"
          placeholder="Price per night"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label id="owner-input-title"> Image URL </label>
        <input
          id="owner-form-inputs"
          type="url"
          name="imageURL"
          placeholder="Spot Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          required
        />
        <p></p>
        <button onClick
        type="submit" className="submit-spot">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
