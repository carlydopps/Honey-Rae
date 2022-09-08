import { Link } from "react-router-dom"
import { deleteTicket, getEmployeeTickets, saveClosedTicket } from "../ApiManager"

export const Ticket = ({ticketObj, currentUser, employees, getAllTickets}) => {

    let assignedEmployee = null

    if (ticketObj.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObj.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const claimButton = () => {
        if (currentUser.staff) {
            return <button
            onClick={() => {
                getEmployeeTickets(userEmployee, ticketObj)
                    .then(getAllTickets)
            }}
        >Claim</button>
        } else {
            return ""
        }
    } 

    const closeButton = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObj.dateCompleted === "") {
            return <button onClick={closeTicket} className="ticket__finish">Finish</button>
        } else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                deleteTicket(ticketObj)
                    .then(getAllTickets)

            }} className="ticket__delete">Delete</button>
        } else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObj.userId,
            description: ticketObj.description,
            emergency: ticketObj.emergency,
            dateCompleted: new Date()
        }

        return saveClosedTicket(ticketObj, copy)
            .then(getAllTickets)
    }

    return <section className="ticket">
    <header className="ticket__header">
        {
            currentUser.staff
                ? `Ticket ${ticketObj.id}`
                : <Link to={`/tickets/${ticketObj.id}/edit`}>Ticket {ticketObj.id}</Link>
        }
    </header>
    <section>{ticketObj.description}</section>
    <section>Emergency: {ticketObj.emergency ? "🧨" : "No"}</section>
    <footer className="ticket__footer">
        {
            ticketObj.employeeTickets.length
                ? `Currently being worked on ${assignedEmployee?.user?.fullName}`
                : claimButton()
        }
        {
            closeButton()
        }
        {
            deleteButton()
        }
    </footer>
</section>
}