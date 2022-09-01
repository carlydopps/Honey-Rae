import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {
    
    const [customers, updateCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
                .then(res => res.json())
                .then((customerArray) => {
                    updateCustomers(customerArray)
                })
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName}
                address={customer.address} 
                phoneNumber={customer.phoneNumber} />)
        }
    </article>
}