import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchEvent, resetEvent, updateParticipationStatus } from "./EventSlice"
import './Details.css'

function EventDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const event = useSelector((state) => state.event.event)
    const status = useSelector((state) => state.event.status)
    const error = useSelector((state) => state.event.error)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEvent(id))
        }
    }, [status, dispatch, id])

    useEffect(() => {
        return () => {
            dispatch(resetEvent())
        }
    }, [dispatch, id])

    const handleStatusChange = (participationId) => {
        dispatch(updateParticipationStatus({ participationId, status: 'Confirmed' }))
    }

    let content

    if (status === 'loading') {
        content = <p>Loading...</p>
    } else if (status === 'succeeded') {
        content = (
            <div className="details-box">
                <h3>{event?.event}</h3>
                <p>{event?.details}</p>
                <h4>Date: {event?.date}</h4>
                <h4>Location: {event?.location}</h4>
                <h4>Participants:</h4>
                <ul>
                    {event?.participations?.map((participation) => (
                        <li key={participation.id}>
                            Username: {participation.member.username} - Role: {participation.member.role} - Status: {participation.participation_status}
                            {participation.participation_status === 'Pending' && (
                                <button onClick={() => handleStatusChange(participation.id)}>Confirm</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else if (status === 'failed') {
        content = <p>{error}</p>
    }

    return (
        <div className="details-container">
            <h2>Welcome to the Event Details Page</h2>
            {content}
        </div>
    )
}

export default EventDetails