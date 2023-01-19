import { useDispatch } from "react-redux"
import { removeSpotThunk } from "../../../store/reducer"
import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"

const DeleteSpot = ({ spotDelete }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const spotRemoval = async (e) => {
        e.preventDefault()
        await dispatch(removeSpotThunk(spotDelete.id))
        await history.push('/')
    }


    return (
        <button onClick={(e) => spotRemoval(e)}>Delete</button>
    );
}

export default DeleteSpot