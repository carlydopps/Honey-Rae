import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getEmployees, getTickets } from "../ApiManager"
import { Ticket } from "./Ticket"
import "./Tickets.css"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchTickets)
        },
        [searchTermState]
    )

    const getAllTickets = () => {
        getTickets()
            .then(ticketArray => setTickets(ticketArray))
    }


    useEffect(
        () => {
            getAllTickets() 

            getEmployees()
                .then(employeeArray => setEmployees(employeeArray))
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect (
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true) 
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    return <>
        {honeyUserObject.staff 
            ? <>
                <button onClick={() => {setEmergency(true)}}>Emergency Only</button>
                <button onClick={() => {setEmergency(false)}}>Show All</button>
            </>
             : <> 
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
             </>
        }
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => <Ticket employees={employees} 
                        getAllTickets={getAllTickets}
                        currentUser={honeyUserObject} 
                        ticketObj={ticket} 
                        key={`ticket--${ticket.id}`}/>)
            }
        </article>
    </>
}
