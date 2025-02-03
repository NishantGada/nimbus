import React from "react";
import './AddTaskModal.css';
import AddTaskForm from "../AddTaskForm/AddTaskForm";

const AddTaskModal = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <AddTaskForm />
                        <div>
                            <button onClick={() => setIsOpen(false)} className="close-modal-btn">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTaskModal;