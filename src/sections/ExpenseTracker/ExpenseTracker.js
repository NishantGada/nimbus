import React, { useEffect, useState } from 'react';
import editIcon from "../../assets/images/edit.png";
import sendRequest from '../../utils/SendRequest';
import './ExpenseTracker.css';

export default function ExpenseTracker() {
    const [userDetails, setUserDetails] = useState({})
    const [isOpen, setIsOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(userDetails.total_budget);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleBudgetChange = (e) => {
        setUserDetails({ ...userDetails, total_budget: e.target.value });
    };

    const handleSaveClick = () => {
        editTotalBudgetAPI(userDetails);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const getUserDetailsAPI = async () => {
        console.log("Inside getUserDetailsAPI");
        try {
            const response = await sendRequest("/users/details", {
                user_email: "test2@gmail.com"
            }, "POST", {});
            console.log("getUserDetailsAPI response: ", response.data.user_details);
            setUserDetails(response.data.user_details)
        } catch (error) {
            console.log("getUserDetailsAPI error: ", error);
        }
    }

    const editTotalBudgetAPI = async (userDetails) => {
        console.log("Inside editTotalBudgetAPI");

        try {
            const response = await sendRequest("/users", userDetails, "PUT", {});
            console.log("editTotalBudgetAPI response: ", response);
        } catch (error) {
            console.log("editTotalBudgetAPI error: ", error);
        }
    }

    useEffect(() => {
        getUserDetailsAPI();
    }, [])

    return (
        <>
            <h3>ExpenseTracker</h3>
            <div>
                <div className='budget-container'>
                    <p>total budget: </p>
                    {isEditing ? (
                        <div>
                            <input
                                type="number"
                                placeholder={userDetails.total_budget}
                                value={newBudget}
                                onChange={handleBudgetChange}
                            />
                            <button onClick={handleSaveClick}>save</button>
                            <button onClick={handleCancelClick}>cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>{userDetails.total_budget}</p>
                            <img src={editIcon} onClick={handleEditClick} alt="Edit" />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}