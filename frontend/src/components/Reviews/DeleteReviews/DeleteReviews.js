import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deleteReviewsThunk } from "../../../store/review-reducer"

const DeleteReport = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams()

    const reviewRemoval = async (e) => {
        e.preventDefault()
        await dispatch(deleteReviewsThunk(spotId))
        history.push('/')
    }

    return (
        <>
        <div className="delete-this-review">

        { sessionUser && sessionUser.id !== spotId.ownerId ? (
            <button onClick={(e) => reviewRemoval(e)}>Delete This Review</button>
            ) :null }
            </div>
        </>
    )
}