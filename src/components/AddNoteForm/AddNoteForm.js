import React, { useState } from "react";
import "./AddNoteForm.css"; // Import CSS file

const AddNoteForm = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [category, setCategory] = useState("Personal");

    const categoryOptions = ["Personal", "Work", "Business", "Other"];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, userEmail, category });
    };

    return (
        <div className="form-container">
            <h2>Add a New Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNoteForm;