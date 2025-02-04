import React from "react";
import "./NotesGrid.css"; // External CSS file for styling

const NotesGrid = ({ notes }) => {
    return (
        <div className="notes-container">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div className="note-card" key={note.id}>
                        <h3 className="note-title">{note.title}</h3>
                        <p className="note-description">{note.description}</p>
                        <div className="note-footer">
                            <span>{note.category}</span>
                            <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="empty-text">No notes available</p>
            )}
        </div>
    );
};

export default NotesGrid;