import { Link } from "react-router-dom"

export const Ticket = ({ticketObj, isStaff}) => {

    return <section className="ticket">
    <header>
        {
            isStaff
                ? `Ticket ${ticketObj.id}`
                : <Link to={`/tickets/${ticketObj.id}/edit`}>Ticket {ticketObj.id}</Link>
        }
    </header>
    <section>{ticketObj.description}</section>
    <footer>Emergency: {ticketObj.emergency ? "🧨" : "No"}</footer>
</section>
}