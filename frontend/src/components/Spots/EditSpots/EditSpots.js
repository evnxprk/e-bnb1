import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneSpotThunk } from "../../../store/spot-reducer";
import React, { useEffect, useState } from "react";
import { updateSpotThunk } from "../../../store/spot-reducer";
import "./EditSpots.css";

const EditSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  const spot = useSelector((state) => state.spots.singleSpot);
  console.log("hello spot: ", spot);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([])
  const minPrice = 1;

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch]);

  useEffect(() => {
    if (spot) {
      console.log("spot description: ", spot);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setCountry(spot.country);
      setName(spot.name);
      setDescription(spot.description);
      setPrice(spot.price);
    }
  }, [spot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price < minPrice) {
      setErrors([`Price must be at least $${minPrice}`]);
      return;
    }
    setErrors([]);

    let editSpotInfo = {
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
    let editedSpot = await dispatch(updateSpotThunk(editSpotInfo, spotId)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    if(editedSpot) history.push(`/spots/${spotId}`);
  };

  return (
    <div className="update-form-container">
      <form className="update-spot" onSubmit={handleSubmit}>
        <div className="spot-form-errors">
          {/* {validationError.length > 0 && */}
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
        <label className="update-spot-title">Edit Your Spot</label>

        <label className="update-spot-input-title">Address</label>
        <input
          className="update-spot-input"
          type="text"
          name="address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label className="update-spot-input-title">City</label>
        <input
          className="update-spot-input"
          type="text"
          name="city"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></input>

        <label className="update-spot-input-title">State</label>
        <input
          className="update-spot-input"
          type="text"
          name="state"
          value={state}
          required
          onChange={(e) => setState(e.target.value)}
        ></input>

        <label className="update-spot-input-title">Country</label>
        <input
          className="update-spot-input"
          type="text"
          name="country"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        ></input>

        <label className="update-spot-input-title">Name</label>
        <input
          className="update-spot-input"
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label className="update-spot-input-title">Description</label>
        <input
          className="update-spot-input"
          type="text"
          name="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <label className="update-spot-input-title">Price</label>
        <input
          className="update-spot-input"
          type="number"
          name="price"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <button className="update-spot-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditSpot;
