import React, { useState } from 'react';

const AddTaskForm = () => {
    // State to manage form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Low');
    const [message, setMessage] = useState('');

    // Enum-like values for status and priority
    const statusOptions = ['Pending', 'In Progress', 'Completed'];
    const priorityOptions = ['Low', 'Medium', 'High'];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the task data
        const taskData = {
            title,
            description,
            due_date: dueDate,
            status,
            priority,
        };

        try {
            // Sending a POST request to the backend API
            const response = await fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            // Check if request was successful
            if (response.ok) {
                setMessage('Task added successfully!');
            } else {
                setMessage('Failed to add task!');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred!');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="due_date">Due Date</label>
                    <input
                        type="date"
                        id="due_date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        {statusOptions.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                                {statusOption}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        {priorityOptions.map((priorityOption) => (
                            <option key={priorityOption} value={priorityOption}>
                                {priorityOption}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Task</button>
            </form>

            {/* Display success or error message */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddTaskForm;