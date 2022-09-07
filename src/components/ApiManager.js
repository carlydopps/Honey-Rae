
// ------------------------------ User Data ---------------------------------------

export const getCustomerUsers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
        .then(res => res.json())
}

export const getEmployeeUsers = () => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then(res => res.json())
}


// ---------------------------- Customer Data -------------------------------------

export const getSpecificCustomer = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(res => res.json())
}

export const getLoggedInCustomer = (honeyUserObject) => {
    return fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
        .then(res => res.json())
}

export const saveCustomerProfile = (profile) => {
    return fetch(`http://localhost:8088/customers/${profile.id}`), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    }
        .then(res => res.json())
}


// ---------------------------- Employee Data -------------------------------------

export const getEmployees = () => {
    return fetch(`http://localhost:8088/employees?_expand=user`)
    .then(res => res.json())
}

export const getSpecificEmployee = (employeeId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(res => res.json())
}

// This is saying we want the employee object whose userId matches the id of the user object that is currently logged in
export const getLoggedInEmployee = (honeyUserObject) => {
    return fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
        .then(res => res.json())
}

export const saveEmployeeProfile = (profile) => {
    return fetch(`http://localhost:8088/employees/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(res => res.json())
}


// ---------------------------- Ticket Data ---------------------------------------

export const getTickets = () => {
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
        .then(res => res.json())
}

export const getSpecificTicket = (ticketId) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(res => res.json())
}

export const saveTicket = (ticket) => {
    return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    })
        .then(res => res.json())
}

export const postTicket = (ticketToSendToAPI) => {
    return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
            .then(res => res.json())
}
