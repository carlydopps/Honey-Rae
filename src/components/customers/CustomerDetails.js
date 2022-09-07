import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSpecificCustomer } from "../ApiManager"

export const CustomerDetails = () => {
    
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            getSpecificCustomer(customerId)
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    return <>
        <section className="customer">
            <header className="customer__header">{customer?.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>Phone Number: {customer.phoneNumber}</div>
            <footer>Address: {customer.address}</footer>
        </section>
    </>
}