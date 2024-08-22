import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClan, resetClan, deleteClan } from "./ClanSlice"
import { useParams, useNavigate } from "react-router-dom"

function ClanDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const clan = useSelector((state) => state.clan.clan)
    const status = useSelector((state) => state.clan.status)
    const error = useSelector((state) => state.clan.error)
    const navigate = useNavigate()

    useEffect(() => {
            dispatch(fetchClan(id))
    }, [dispatch, id])

    useEffect(() => {
        return () => {
          dispatch(resetClan())
        }
      }, [dispatch, id])
    
    const handleDelete = () => {
        dispatch(deleteClan(id)).then(() => {
            navigate('/clans')
        })
    }

    let content

    if (status === 'loading') {
        content = <p>Loading...</p>
    } else if (status === 'succeeded') {
        content = (
            <div className="details-box">
                <h3>{clan.name}</h3>
                <p>{clan.description}</p>
                <button onClick={handleDelete}>Delete Clan</button>
                <h4>Members:</h4>
                <ul>
                    {clan.members?.map((member) => (
                        <li key={member.id}>
                            {member.username} - {member.role}
                            <ul>
                                {member.participations.map((participation) => (
                                    <li key={participation.id}>
                                        Event: {participation.event.event} - Status: {participation.participation_status}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <h4>Events:</h4>
                <ul>
                    {clan.events?.map((event) => (
                        <li key={event.id}>
                            {event.event} - {event.date} - {event.location} - {event.details}
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
            <h2>Welcome to the Clan Details Page</h2>
            {content}
        </div>
    )
}

export default ClanDetails