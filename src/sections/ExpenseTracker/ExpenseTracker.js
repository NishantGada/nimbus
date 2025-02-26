import React, { useEffect, useState } from 'react';
import editIcon from "../../assets/images/edit.png";
import sendRequest from '../../utils/SendRequest';
import './ExpenseTracker.css';
import ExpensesTable from './ExpensesTable';

export default function ExpenseTracker() {
    const [userDetails, setUserDetails] = useState({});
    const [userExpenses, setUserExpenses] = useState([]);

    const [userId, setUserId] = useState("cd9c208f-a60c-4034-a257-d60dc3b46b52");
    const [userEmail, setUserEmail] = useState("test2@gmail.com");

    const [isEditing, setIsEditing] = useState({
        "total_budget": false,
        "monthly_income": false
    });

    const handleBudgetEditClick = () => {
        setIsEditing({ ...isEditing, "total_budget": true });
    };
    const handleBudgetChange = (e) => {
        setUserDetails({ ...userDetails, total_budget: e.target.value });
    };

    const handleIncomeEditClick = () => {
        setIsEditing({ ...isEditing, "monthly_income": true });
    };
    const handleIncomeChange = (e) => {
        setUserDetails({ ...userDetails, monthly_income: e.target.value });
    };

    const handleSaveClick = () => {
        editUserDetailsAPI(userDetails);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const getUserDetailsAPI = async () => {
        console.log("Inside getUserDetailsAPI");
        try {
            const response = await sendRequest("/users/details", {
                user_email: userEmail
            }, "POST", {});
            console.log("getUserDetailsAPI response: ", response.data.user_details);

            setUserDetails(response.data.user_details)
        } catch (error) {
            console.log("getUserDetailsAPI error: ", error);
        }
    }

    const editUserDetailsAPI = async (userDetails) => {
        console.log("Inside editUserDetailsAPI");

        try {
            const response = await sendRequest("/users", userDetails, "PUT", {});
            console.log("editUserDetailsAPI response: ", response);
        } catch (error) {
            console.log("editUserDetailsAPI error: ", error);
        }
    }

    const findExpensesByUserAPI = async () => {
        console.log("Inside findExpensesByUser");
        try {
            if (userDetails) {
                const response = await sendRequest("/users/expenses", {
                    user_email: userEmail
                }, "POST", {});
                console.log("findExpensesByUser response: ", response);
                setUserExpenses(response.data.user_expenses);
            }
        } catch (error) {
            console.log("findExpensesByUser error: ", error);
        }
    }

    const editExpenseAPI = async () => {
        console.log("Inside editExpenseAPI");
        try {
            const response = await sendRequest("");
            console.log("editExpenseAPI response: ", response);
        } catch (error) {
            console.log("editExpenseAPI error: ", error);
        }
    }

    const deleteExpenseAPI = async (expense_id) => {
        console.log("Inside deleteExpenseAPI");
        try {
            const response = await sendRequest(`/users/expenses?user_id=${userId}&expense_id=${expense_id}`, {}, "DELETE", {})
            console.log("deleteExpenseAPI response: ", response);

            findExpensesByUserAPI();
        } catch (error) {
            console.log("deleteExpenseAPI error: ", error);
        }
    }

    useEffect(() => {
        if (userDetails && Object.keys(userDetails).length > 0) {
            console.log("User details updated:", userDetails);
            findExpensesByUserAPI(userDetails);
        }
    }, [userDetails]);

    useEffect(() => {
        getUserDetailsAPI();
    }, [])

    return (
        <section>
            <h3>ExpenseTracker</h3>
            <div className='expense-tracker-banner'>
                <div>
                    <div className='user-details-container'>
                        <p>total budget: </p>
                        {isEditing.total_budget ? (
                            <div>
                                <input
                                    type="number"
                                    placeholder={userDetails.total_budget}
                                    onChange={handleBudgetChange}
                                />
                                <button onClick={handleSaveClick}>save</button>
                                <button onClick={handleCancelClick}>cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{userDetails.total_budget}</p>
                                <img src={editIcon} onClick={handleBudgetEditClick} alt="Edit" />
                            </div>
                        )}
                    </div>
                    <div className='user-details-container'>
                        <p>monthly income: </p>
                        {isEditing.monthly_income ? (
                            <div>
                                <input
                                    type="number"
                                    placeholder={userDetails.monthly_income}
                                    onChange={handleIncomeChange}
                                />
                                <button onClick={handleSaveClick}>save</button>
                                <button onClick={handleCancelClick}>cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{userDetails.monthly_income}</p>
                                <img src={editIcon} onClick={handleIncomeEditClick} alt="Edit" />
                            </div>
                        )}
                    </div>
                </div>
                <button>Add Expense</button>
            </div>
            <br />
            <ExpensesTable userExpenses={userExpenses} deleteExpenseAPI={deleteExpenseAPI} />
        </section>
    )
}