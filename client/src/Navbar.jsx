import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create-clan">Create Clan</Link>
                </li>
                <li>
                    <Link to="/create-event">Create Event</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar