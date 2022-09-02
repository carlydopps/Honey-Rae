import { Link } from "react-router-dom"

export const Ticket = ({ticketObj, isStaff, employees}) => {

    let assignedEmployee = null

    if (ticketObj.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObj.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    return <section className="ticket">
    <header>
        {
            isStaff
                ? `Ticket ${ticketObj.id}`
                : <Link to={`/tickets/${ticketObj.id}/edit`}>Ticket {ticketObj.id}</Link>
        }
    </header>
    <section>{ticketObj.description}</section>
    <section>Emergency: {ticketObj.emergency ? "🧨" : "No"}</section>
    <footer>
        {
            ticketObj.employeeTickets.length
                ? `Currently being worked on ${assignedEmployee.user.fullName}`
                : <button>Claim</button>
        }
    </footer>
</section>
}