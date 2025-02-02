import React, { useEffect, useState } from 'react'
import './Tasks.css'
import '../../sections/sectionStyles.css'
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm'
import sendRequest from '../../utils/SendRequest'
import DisplayTasksTable from './DisplayTasksTable'

export default function Tasks() {
    const handleSubmit = () => {
        alert("New Task Added.")
    }

    const [allTasks, setAllTasks] = useState([]);

    const getAllTasksAPI = async () => {
        try {
            const response = await sendRequest("http://localhost:8080/tasks", {}, "GET", {})
            setAllTasks(response.data)
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const deleteTaskAPI = async (task_id) => {
        console.log("Inside deleteTaskAPI: ", task_id);
        try {
            const response = await sendRequest(`http://localhost:8080/tasks/${task_id}`, {}, "DELETE", {})
            console.log("deleteTaskAPI response: ", response);

            response.status == "200" ? getAllTasksAPI() : alert("Error deleting the task!")
        } catch (error) {
            console.log("deleteTaskAPI error: ", error);
        }
    }

    useEffect(() => {
        getAllTasksAPI();
    }, [])

    console.log("allTasks: ", allTasks);

    return (
        <>
            <div className='tasks_top_section'>
                <div className='section_headings'>Tasks</div>
                <button id='add_new_task_button' onClick={handleSubmit}>Add new</button>
            </div>
            {/* <AddTaskForm /> */}
            {
                (allTasks.length !== 0) ? 
                <DisplayTasksTable allTasks={allTasks} deleteTask={deleteTaskAPI} /> : 
                <div style={{ textAlign: "center", margin: "20px 0" }}>
                    You're all set!
                </div>
            }
        </>
    )
}