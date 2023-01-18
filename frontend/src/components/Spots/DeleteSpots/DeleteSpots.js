import { useDispatch } from "react-redux"
import { removeSpotThunk } from "../../../store/reducer"
import React from 'react'

const DeleteSpot = ({ spotDelete}) => {
    const dispatch = useDispatch()
    
    const spotRemoval = async (e) => {
        e.preventDefault()
        await dispatch(removeSpotThunk(spotDelete.id))
    }

    return (
      <form className="delete-spot-form" onSubmit={spotRemoval}>
        <label id="delete-spot-title">Delete Your Spot</label>
        <h3 id="delete-spot-confirm">
          {" "}
          Are you sure you want to delete this spot?
        </h3>
        <button onClick={spotRemoval}>Delete</button>
      </form>
    );
}

export default DeleteSpot