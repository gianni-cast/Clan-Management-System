import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createEvent } from "./EventFormSlice"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import './EventForm.css'

function CreateEventForm() {
  const dispatch = useDispatch()
  const eventStatus = useSelector((state) => state.eventForm.status)
  const eventError = useSelector((state) => state.eventForm.error)
  const [clans, setClans] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:5555/clans')
    .then(resp => {
      setClans(resp.data)
    })
    .catch(error => {
      console.error("There was an error fetching the clans!", error);
    })
  }, [])

  const initialValues = {
    event: "",
    date: "",
    location: "",
    details: "",
    clan_id: "",
  }

  const validationSchema = Yup.object({
    event: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    location: Yup.string().required("Required"),
    details: Yup.string().required("Required"),
    clan_id: Yup.string().required("Required"),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(createEvent(values))
    setSubmitting(false)
  }

  return (
    <div className="form-container">
      <span className="title-text"><h2>Welcome to the Create an Event Form Page</h2></span>
      <span className="title-text"><p>This is the create an event form page of the application.</p></span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div>
              <label htmlFor="event">Event Name</label>
              <Field type="text" name="event" />
              <ErrorMessage name="event" component="div" />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <Field type="date" name="date" />
              <ErrorMessage name="date" component="div" />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <Field type="text" name="location" />
              <ErrorMessage name="location" component="div" />
            </div>
            <div>
              <label htmlFor="details">Details</label>
              <Field type="text" name="details" />
              <ErrorMessage name="details" component="div" />
            </div>
            <div>
            <label htmlFor="clan_id">Clan</label>
              <Field as="select" name="clan_id">
                <option value="">Select a clan</option>
                {clans.map(clan => (
                  <option key={clan.id} value={clan.id}>
                    {clan.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="clan_id" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Create Event
            </button>
          </Form>
        )}
        </Formik>
        {eventStatus === 'loading' && <p>Loading...</p>}
        {eventStatus === 'failed' && <p>Error: {eventError}</p>}
    </div>
  )
}

export default CreateEventForm