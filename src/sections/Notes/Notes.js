import React, { useEffect, useState } from 'react';
import AddNoteModal from '../../components/AddNoteModal/AddNoteModal';
import '../../sections/sectionStyles.css';
import sendRequest from '../../utils/SendRequest';
import NotesGrid from './NotesGrid';

/*
TODO:
1. conditionally render notes based on user
2. conditionally render notes based on category
3. implement update note functionality
*/

export default function Notes() {
    const [allNotes, setAllNotes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const getAllNotesAPI = async () => {
        console.log("Inside getAllNotesAPI");
        try {
            const response = await sendRequest("/notes", {}, "GET", {});
            setAllNotes(response.data)
        } catch (error) {
            console.log("getAllNotesAPI error: ", error);
        }
    }

    const deleteNoteAPI = async (note_id) => {
        console.log("Inside deleteNoteAPI");

        try {
            console.log("deleteNoteAPI note_id: ", note_id);
            const response = await sendRequest(`/notes/${note_id}`, {}, "DELETE", {});

            response.status === "200" ? getAllNotesAPI() : alert("Error deleting the note!")
        } catch (error) {
            console.log("deleteNoteAPI error: ", error);
        }
    }

    useEffect(() => {
        getAllNotesAPI();
    }, [])

    console.log("allNotes: ", allNotes);

    return (
        <>
            <div className='section_headings'>Notes</div>
            <button id='add_new_task_button' onClick={() => setIsOpen(true)} className="open-modal-btn">
                Add New Note
            </button>
            <AddNoteModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <NotesGrid notes={allNotes} deleteNoteAPI={deleteNoteAPI} />
        </>
    )
}