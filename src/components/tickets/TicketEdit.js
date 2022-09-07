import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSpecificTicket, saveTicket } from "../ApiManager"

export const TicketEdit = () => {

    const {ticketId} = useParams()
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false
    })

   const navigate = useNavigate()

    useEffect(
        () => {
            getSpecificTicket(ticketId)
                .then(data => updateTicket(data))
        },
        [ticketId]
    )
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return saveTicket(ticket)
            .then(() => navigate("/tickets"))
    }

    return ( 
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.description = event.target.value
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.emergency = event.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save
            </button>
        </form>
    )
}