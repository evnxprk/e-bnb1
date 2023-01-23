import { useDispatch  } from "react-redux";
import { useHistory, useParams  } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updateSpotThunk } from "../../../store/spot-reducer";

const EditSpot = ({spot}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {spotId} = useParams()
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [validationError, setValidationError] = useState([]);
  // if(!spot) return null
  
  useEffect(() => {
    const errors = [];
    if (address.length === 0) errors.push("Please enter a valid address.");
    if (city.length === 0) errors.push("Please enter a valid city.");
    if (state.length === 0) errors.push("Please enter a valid state.");
    if (country.length === 0) errors.push("Please enter a valid country.");
    if (name.length === 0) errors.push("Please enter a valid name.");
    if (description.length === 0)
    errors.push("Please enter a valid description.");
    if (!Number(price)) errors.push("Please enter a valid price.");
    setValidationError(errors);
  }, [address, city, state, country, name, description, price]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validationError.length) return;
    
    let editSpotInfo = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      lat:1,
      lng:1
    };
      await dispatch(updateSpotThunk(editSpotInfo, spotId));
      history.push('/');
};

  return (
    <form className="update-spot" onSubmit={handleSubmit}>
      <div className="update-current-spot-form ">
        <ul className="errors">
          {validationError.length > 0 &&
            validationError.map((error) => <li key={error}>{error}</li>)}
        </ul>
      </div>
      <label className="update-spot-title">Edit Your Spot</label>
      <label className="update-spot-input-title">Address</label>
      <input
        className="update-spot-input"
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></input>

      <label className="update-spot-input-title">City</label>
      <input
        className="update-spot-input"
        type="text"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      ></input>
      <label className="update-spot-input-title">State</label>
      <input
        className="update-spot-input"
        type="text"
        name="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
      ></input>
      <label className="update-spot-input-title">Country</label>
      <input
        className="update-spot-input"
        type="text"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      ></input>
      <label className="update-spot-input-title">Name</label>
      <input
        className="update-spot-input"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label className="update-spot-input-title">Description</label>
      <input
        className="update-spot-input"
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <label className="update-spot-input-title">Price</label>
      <input
        className="update-spot-input"
        type="text"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <button id="update-spot-confirm" type="submit">
        {" "}
        Confirm Update Spot
      </button>
    </form>
  );
};

export default EditSpot
