import { useState } from "react"
import { notes } from "./notes"

function Notes() {

    const [inValue, setInValue] = useState('')
    const [notesList, setNotesList] = useState(notes)


    function handleSubmit() {
        const newNote = {
            content: inValue,
            id: notesList.length + 1,
            important: Math.random() > 0.5
        }
        //Just another way to update state
        /* const newList = [...notesList, newNote]
        setNotesList(newList) */
        setNotesList(prevList => [...prevList, newNote])
        setInValue('')
    }
    return (
        <div>
            <h2>Notes List</h2>
            <ul>
                {notesList.map(note => <li key={note.id}>{note.content} <span className={note.important ? "important" : 'not-important'}>{note.important?'important':'not-important'}</span></li>)}
            </ul>
            <div>
                <input type="text" onChange={e => setInValue(e.target.value)} value={inValue} autoFocus/>
                <button onClick={handleSubmit}>Add note</button>
            </div>
        </div>
    )
}

export default Notes