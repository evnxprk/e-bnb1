import { useDispatch } from "react-redux";
import "./CreateSpotsForm.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { createImageThunk, createSpotThunk } from "../../../store/spot-reducer";

const CreateForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [imageURL, setImageURL] = useState("");
  const [validationError, setValidationError] = useState([]);
  const [errors, setErrors] = useState([])

const minPrice = 1;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (price < minPrice) {
    setValidationError([`Price must be at least $ ${minPrice}`]);
    return;
  }
  setValidationError([]);

  // Rest of the handleSubmit logic
  const spotFormInfo = {
    address,
    city,
    state,
    country,
    name,
    description,
    price,
    lat: 1,
    lng: 1,
  };

  let spotCreated = await dispatch(createSpotThunk(spotFormInfo)).catch(
    async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    }
  );
  // console.log("what is this?", spotCreated.id);
  if (spotCreated) {
    const img = {
      url: imageURL,
      preview: true,
    };

    dispatch(createImageThunk(img, spotCreated.id));
    // console.log("hi", img);
    history.push("/");
  }
};

  return (
      < div className="spot-container">
    <form onSubmit={handleSubmit}>

      <div className="create-new-spot-form ">
        <h2>Begin Hosting</h2>
        <ul className="errors">
          {validationError.length > 0 &&
            validationError.map((error) => <li key={error}>{error}</li>)}
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
          required
          onChange={(e) => setCountry(e.target.value)}
        />

        <label id="owner-input-title"> Name </label>
        <input
          id="owner-form-inputs"
          type="text"
          name="name"
          placeholder="Name of Spot"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
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
          type="number"
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
        <button type="submit" className="submit-spot">
          Confirm
        </button>
      </div>
    </form>
    </div> 
  );
};

export default CreateForm;
