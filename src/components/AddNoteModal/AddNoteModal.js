import React from "react";
import AddNoteForm from "../AddNoteForm/AddNoteForm";
import './AddNoteModal.css';

const AddNoteModal = ({ isOpen, setIsOpen, addNewNoteAPI, noteCategories }) => {
    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <AddNoteForm addNewNoteAPI={addNewNoteAPI} noteCategories={noteCategories} />
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