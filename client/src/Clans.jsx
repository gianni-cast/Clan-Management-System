import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClans, resetStatus } from "./ClanSlice"
import { Link } from "react-router-dom"
import './Clans.css'

function Clans() {
    const dispatch = useDispatch()
    const clans = useSelector((state) => state.clan.clans)
    const status = useSelector((state) => state.clan.status)
    const error = useSelector((state) => state.clan.error)

    useEffect(() => {
        dispatch(fetchClans())
    }, [dispatch])

    useEffect(() => {
        return () => {
            dispatch(resetStatus())
        }
    }, [])

    let content

    if (status === 'loading') {
        content = <p>Loading...</p>
    } else if (status === 'succeeded') {
        content = (
            <div className="clans-wrapper">
                {clans.map((clan) => (
                    <div key={clan.id} className="clan-box">
                        <h3>
                            <Link to={`/clans/${clan.id}`}>{clan.name}</Link>
                        </h3>
                        <p>{clan.description}</p>
                        <h4>Members:</h4>
                        <div className="members-container">
                            <ul>
                                {clan.members.map((member) => (
                                    <li key={member.id}>
                                        <span className="username-text">Username:</span>{member.username} <span className="role-text">Role:</span> {member.role}
                                        <ul>
                                            {member.participations.map((participation) => (
                                                <li key={participation.id}>
                                                    <span className="event-text">Event:</span> {participation.event.event}
                                                    <br />
                                                    <span className="status-text">Status:</span> {participation.participation_status}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h4>Events:</h4>
                        <div className="events-container">
                            <ul>
                                {clan.events.map((event) => (
                                    <li key={event.id}>
                                        <Link to={`/events/${event.id}`}>{event.event}</Link> - {event.date} - {event.location} - {event.details}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        )
    } else if (status === 'failed') {
        content = <p>{error}</p>
    }

    return (
        <div className="container">
            <h2>Welcome to the Clans Page</h2>
            {content}
        </div>
    )
}

export default Clans