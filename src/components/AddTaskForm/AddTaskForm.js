import React, { useState } from 'react';
import './AddTaskForm.css'
import sendRequest from '../../utils/SendRequest';

const AddTaskForm = () => {
    // State to manage form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('To Do');
    const [priority, setPriority] = useState('Low');
    const [message, setMessage] = useState('');

    // Enum-like values for status and priority
    const statusOptions = ['To Do', 'In Progress', 'Completed'];
    const priorityOptions = ['Low', 'Medium', 'High'];

    const addTaskAPI = async () => {
        console.log("Inside addTaskAPI");        
        try {
            const requestData = {
                "title": title,
                "description": description,
                "due_date": dueDate,
                "status": status,
                "priority": priority,
                // "user_id": "e1fa0294-4976-4e0f-89c9-be78a12ed701"
                "user_email": "test2@gmail.com"
            }
            console.log("addTaskAPI requestData: ", requestData);
            const response = await sendRequest("/tasks", requestData, "POST", {});

            console.log("addTaskAPI response: ", response);
        } catch (error) {
            console.log("addTaskAPI error: ", addTaskAPI);
        }
    }

    return (
        <div className="form-container">
            {/* <h2>Add New Task</h2> */}
            <form onSubmit={() => addTaskAPI()} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Task Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="due_date">Due Date</label>
                    <input
                        type="date"
                        id="due_date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        {statusOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        {priorityOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-button">Add Task</button>
            </form>
        </div>
    );
};

export default AddTaskForm;