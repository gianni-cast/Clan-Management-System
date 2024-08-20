import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createEvent } from "./EventFormSlice"

function CreateEventForm() {
  const dispatch = useDispatch()
  const eventStatus = useSelector((state) => state.eventForm.status)
  const eventError = useSelector((state) => state.eventForm.error)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    dispatch(createEvent(formData))
  }

  return (
    <div>
      <h2>Welcome to the Create an Event Form Page</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="eventName" placeholder="Event Name" required />
        <input type="date" name="eventDate" required />
        <button type="submit">Create Event</button>
      </form>
      {eventStatus === 'loading' && <p>Loading...</p>}
      {eventStatus === 'succeeded' && <p>Event created successfully!</p>}
      {eventStatus === 'failed' && <p>Error: {eventError}</p>}
    </div>
  )
}

export default CreateEventForm