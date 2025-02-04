import React from "react";
import './AddNoteModal.css'
import AddNoteForm from "../AddNoteForm/AddNoteForm";

const AddNoteModal = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <AddNoteForm />
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

export default AddNoteModal;