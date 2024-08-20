import React from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { createClan } from "./ClanFormSlice"

function CreateClanForm() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.clanForm.status)
  const error = useSelector((state) => state.clanForm.error)

  const initialValues = {
    name: "",
    description: "",
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(createClan(values))
    setSubmitting(false)
  }

  return (
    <div>
      <h2>Welcome to the Create a Clan Form Page</h2>
      <p>This is the create a clan form page of the application.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Clan Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Create Clan
            </button>
          </Form>
        )}
        </Formik>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
    </div>
  )
}

export default CreateClanForm