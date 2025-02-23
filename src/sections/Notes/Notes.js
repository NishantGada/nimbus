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
    const [noteCategories, setNoteCategories] = useState({});

    const getAllNotesAPI = async () => {
        console.log("Inside getAllNotesAPI");
        try {
            const response = await sendRequest("/notes", {}, "GET", {});
            setAllNotes(response.data.notes)
        } catch (error) {
            console.log("getAllNotesAPI error: ", error);
        }
    }

    const addNewNoteAPI = async ({ title, description, userEmail, category }) => {
        console.log("inside addNewNoteAPI");
        console.log("request body: ", { title, description, userEmail, category });
        try {
            const response = await sendRequest("/notes", {
                title,
                description,
                user_email: userEmail,
                category
            }, "POST", {});
            console.log("addNewNoteAPI response: ", response.data);
            setIsOpen(false);
            getAllNotesAPI();
        } catch (error) {
            console.log("addNewNoteAPI error: ", error);
        }
    }

    const deleteNoteAPI = async (note_id) => {
        console.log("Inside deleteNoteAPI");

        try {
            console.log("deleteNoteAPI note_id: ", note_id);
            const response = await sendRequest(`/notes/${note_id}`, {}, "DELETE", {});
            console.log("response.status: ", response.status);
            response.status === 200 ? getAllNotesAPI() : alert("Error deleting the note!")
        } catch (error) {
            console.log("deleteNoteAPI error: ", error);
        }
    }

    const updateNoteAPI = async (note_id, user_id) => {
        console.log("updateNoteAPI note_id, user_id: ", note_id, user_id);
        try {
            const response = await sendRequest(`/notes/${note_id}`, {
                "category_id": "Business",
                "description": "Discuss idea roadmap and deadlines.",
                "note_id": "00194c1f-9862-4634-8e52-2bb3d15995d6",
                "title": "Startup Idea",
                "user_email": "test2@gmail.com"
            }, "PUT", {})

            console.log("updateNoteAPI response: ", response);
        } catch (error) {
            console.log("updateNoteAPI error: ", error);
        }
    }

    const getAllNoteCategoriesAPI = async () => {
        try {
            const response = await sendRequest("/note-categories", {}, "GET", {})
            console.log("response: ", response.data);

            setNoteCategories(response.data);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        getAllNotesAPI();
        getAllNoteCategoriesAPI();
    }, [])

    return (
        <>
            <div className='section_headings'>Notes</div>
            <button id='add_new_task_button' onClick={() => setIsOpen(true)} className="open-modal-btn">
                Add New Note
            </button>
            <AddNoteModal isOpen={isOpen} setIsOpen={setIsOpen} addNewNoteAPI={addNewNoteAPI} noteCategories={noteCategories} />
            <NotesGrid notes={allNotes} updateNoteAPI={updateNoteAPI} deleteNoteAPI={deleteNoteAPI} noteCategories={noteCategories} />
        </>
    )
}