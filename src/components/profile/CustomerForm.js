import { useEffect, useState } from "react"
import { getLoggedInCustomer, saveCustomerProfile } from "../ApiManager"

export const CustomerForm = () => {
    
    const [feedback, setFeedback] = useState("")
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])


    useEffect(
        () => {
            getLoggedInCustomer(honeyUserObject)
                .then((data) => {
                    const customerObj = data[0]
                    updateProfile(customerObj)
                })
    },[]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return saveCustomerProfile(profile)
            .then(() => setFeedback("Customer profile successfully saved"))
    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}