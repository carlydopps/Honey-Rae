import { Link } from "react-router-dom"

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
                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: userEmployee.id,
                        serviceTicketId: ticketObj.id
                    })
                })
                    .then(res => res.json())
                    .then(() => {
                        getAllTickets()
                    })
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
                fetch(`http://localhost:8088/serviceTickets/${ticketObj.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    getAllTickets()
                })

            }} className="ticket__delete">Delete</button>
        } else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObj.id,
            description: ticketObj.description,
            emergency: ticketObj.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(res => res.json())
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