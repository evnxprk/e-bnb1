import { useDispatch, useSelector } from "react-redux"
import { removeSpotThunk } from "../../../store/spot-reducer"
import React, { useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"

const DeleteSpot = ({spotDelete}) => {
  const sessionUser = useSelector(state => state.session.user)
  const {spotId } = useParams
    const dispatch = useDispatch()
    const history = useHistory()
    
    const spotRemoval = async (e) => {
        e.preventDefault()
        await dispatch(removeSpotThunk(spotDelete.id))
        await history.push('/')
    }


    return (
      <>
      {sessionUser ? (
        <button onClick={(e) => spotRemoval(e)}>Delete</button>
      ) : (
        null
      )}
      </>
    );
}

export default DeleteSpot