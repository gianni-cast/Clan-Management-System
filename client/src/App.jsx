import { Routes, Route } from "react-router-dom"
import ClanDetails from "./ClanDetails"
import Clans from "./Clans"
import CreateClanForm from "./CreateClanForm"
import CreateEventForm from "./CreateEventForm"
import Navbar from "./Navbar"
import EventDetails from "./EventDetails"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Clans />} />
        <Route path="/clans/:id" element={<ClanDetails />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/create-clan" element={<CreateClanForm />} />
        <Route path="/create-event" element={<CreateEventForm />} />
      </Routes>
    </div>
  )
}
export default App
