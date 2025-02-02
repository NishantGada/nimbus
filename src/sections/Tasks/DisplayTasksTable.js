import React from 'react'
import './DisplayTasksTable.css'

export default function DisplayTasksTable({ allTasks, deleteTask }) {
    return (
        <div>
            {/* Table for displaying tasks */}
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTasks.map((task, index) => {
                            return (
                                <tr key={task.task_id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.due_date}</td>
                                    <td>{task.status}</td>
                                    <td>{task.priority}</td>
                                    <td><button onClick={() => deleteTask(task.task_id)}>delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}