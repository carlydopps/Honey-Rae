import { useEffect, useState } from "react"
import { getEmployeeUsers } from "../ApiManager"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            getEmployeeUsers()
                .then(employeeArray => setEmployees(employeeArray))
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} />)
        }
    </article>
}