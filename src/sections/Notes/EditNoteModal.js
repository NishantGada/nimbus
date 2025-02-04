import React, { useState } from "react";
import "./EditNoteModal.css";

const EditNoteModal = ({ note, onClose, updateNote, deleteNote }) => {
    const [editedNote, setEditedNote] = useState({ ...note });

    const handleChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Note</h2>
                <input
                    type="text"
                    name="title"
                    value={editedNote.title}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    value={editedNote.description}
                    onChange={handleChange}
                ></textarea>

                <div className="modal-buttons">
                    <button onClick={() => updateNote(editedNote)}>Save</button>
                    {/* <button onClick={() => deleteNote(note.id)}>Delete</button> */}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditNoteModal;
