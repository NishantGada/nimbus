import React, { useState } from "react";
import "./EditNoteModal.css";

const EditNoteModal = ({ note, noteCategories, onClose, updateNoteAPI }) => {
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
                    placeholder="Title"
                />

                <textarea
                    name="description"
                    value={editedNote.description}
                    onChange={handleChange}
                    placeholder="Description"
                ></textarea>

                <select
                    name="category"
                    value={editedNote.category}
                    onChange={handleChange}
                >
                    {noteCategories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_name}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>

                <div className="modal-buttons">
                    <button onClick={() => updateNoteAPI(editedNote)}>Save</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditNoteModal;