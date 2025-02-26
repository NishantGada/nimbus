import React from "react";

const ExpensesTable = ({ userExpenses, deleteExpenseAPI }) => {
    return (
        <div>
            {
                userExpenses.length > 0 ?
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid lightgray" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f2f2f2", borderBottom: "1px solid lightgray" }}>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Added Date</th>
                                <th>Updated Date</th>
                                <th>Edit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userExpenses.map((expense) => (
                                <tr key={expense.expense_id}>
                                    <td>{expense.expense_name}</td>
                                    <td>{expense.expense_desc}</td>
                                    <td>${expense.expense_amount}</td>
                                    <td>{expense.expense_category_name}</td>
                                    <td>{expense.expense_add_date}</td>
                                    <td>{expense.expense_update_date}</td>
                                    <td><button onClick={() => editExpenseAPI(expense.expense_id)}>del</button></td>
                                    <td><button onClick={() => deleteExpenseAPI(expense.expense_id)}>del</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table> :
                    <>
                        <p>No Expenses to show</p>
                    </>
            }
        </div>
    );
};

export default ExpensesTable;