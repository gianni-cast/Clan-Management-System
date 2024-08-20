import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClan, resetClan } from "./ClanSlice"
import { useParams } from "react-router-dom"

function ClanDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const clan = useSelector((state) => state.clan.clan)
    const status = useSelector((state) => state.clan.status)
    const error = useSelector((state) => state.clan.error)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchClan(id))
        }
    }, [status, dispatch, id])

    useEffect(() => {
        return () => {
          dispatch(resetClan())
        }
      }, [dispatch, id])

    let content

    if (status === 'loading') {
        content = <p>Loading...</p>
    } else if (status === 'succeeded') {
        content = (
            <div>
                <h3>{clan.name}</h3>
                <p>{clan.description}</p>
                <h4>Members:</h4>
                <ul>
                    {clan.members.map((member) => (
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
                    {clan.events.map((event) => (
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
        <div>
            <h2>Welcome to the Clan Details Page</h2>
            {content}
        </div>
    )
}

export default ClanDetails