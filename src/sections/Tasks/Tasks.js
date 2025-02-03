import React, { useEffect, useState } from 'react'
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal'
import '../../sections/sectionStyles.css'
import sendRequest from '../../utils/SendRequest'
import DisplayTasksTable from './DisplayTasksTable'
import './Tasks.css'

export default function Tasks() {
    const [allTasks, setAllTasks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        alert("New Task Added.")
    }

    const getAllTasksAPI = async () => {
        try {
            const response = await sendRequest("/tasks", {}, "GET", {})
            setAllTasks(response.data)
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const deleteTaskAPI = async (task_id) => {
        console.log("Inside deleteTaskAPI: ", task_id);
        try {
            const response = await sendRequest(`/tasks/${task_id}`, {}, "DELETE", {})
            console.log("deleteTaskAPI response: ", response);

            response.status == "200" ? getAllTasksAPI() : alert("Error deleting the task!")
        } catch (error) {
            console.log("deleteTaskAPI error: ", error);
        }
    }

    useEffect(() => {
        getAllTasksAPI();
    }, [])

    return (
        <>
            <div className='tasks_top_section'>
                <div className='section_headings'>Tasks</div>
                <button id='add_new_task_button' onClick={() => setIsOpen(true)} className="open-modal-btn">
                    Add New Task
                </button>
            </div>
            <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen} />
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