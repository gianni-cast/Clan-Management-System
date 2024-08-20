import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClans } from "./ClansSlice"
import { Link } from "react-router-dom"

function Clans() {
    const dispatch = useDispatch()
    const clans = useSelector((state) => state.clans.clans)
    const status = useSelector((state) => state.clans.status)
    const error = useSelector((state) => state.clans.error)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchClans())
        }
    }, [status, dispatch])

    let content

    if (status === 'loading') {
        content = <p>Loading...</p>
      } else if (status === 'succeeded') {
        content = clans.map((clan) => (
          <div key={clan.id}>
            <h3>
                <Link to={`/clans/${clan.id}`}>{clan.name}</Link>
            </h3>
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
                  <Link to={`/events/${event.id}`}>{event.event}</Link> - {event.date} - {event.location} - {event.details}
                </li>
              ))}
            </ul>
          </div>
        ))
      } else if (status === 'failed') {
        content = <p>{error}</p>
      }
    
      return (
        <div>
          <h2>Welcome to the Clans Page</h2>
          {content}
        </div>
      )
    }
    
    export default Clans