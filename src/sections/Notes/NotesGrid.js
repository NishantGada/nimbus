import React, { useState } from "react";
import EditNoteModal from "./EditNoteModal";
import "./NotesGrid.css";
import dustbinIcon from "./images/dustbin.png";
import editIcon from "./images/edit.png";

const NotesGrid = ({ notes, updateNoteAPI, deleteNoteAPI, noteCategories }) => {
    const [selectedNote, setSelectedNote] = useState(null);

    return (
        <div className="notes-container">
            {notes.length > 0 ? (
                notes.map((note) => (
                    <div
                        className="note-card"
                        key={note.note_id}
                    >
                        <div className="note-card-header">
                            <h3 className="note-title">{note.title}</h3>
                            <div>
                                <img src={editIcon} onClick={() => setSelectedNote(note)} />
                                <img src={dustbinIcon} onClick={() => deleteNoteAPI(note.note_id)} />
                            </div>
                        </div>
                        <p className="note-description">{note.description}</p>
                        <div className="note-footer">
                            <span>{noteCategories[note.category_id]}</span>
                            <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="empty-text">No notes available</p>
            )}

            {selectedNote && (
                <EditNoteModal
                    note={selectedNote}
                    onClose={() => setSelectedNote(null)}
                    noteCategories={noteCategories}
                    updateNoteAPI={updateNoteAPI}
                />
            )}
        </div>
    );
};

export default NotesGrid;