import { useEffect, useState } from "react"
import noteService from "./services/notes"
import './axiosNotes.css'

function AxiosNotes() {
    const [noteList, setNoteList] = useState(null)
    const [value, setvalue] = useState('')

    useEffect(() => {
        noteService
            .getAll()
            .then(response => setNoteList(response.data))
    }, [])

    const toogleImportance = (id) => {
        console.log('needs to be toggled  ' + id)
        const note = noteList.find(note => note.id === id)
        const updatedNote = { ...note, important: !note.important }

        noteService
            .updateElement(updatedNote)
            .then((res) => setNoteList(prevList => prevList.map(element => element.id !== id ? element : res.data)))
            .catch(err => console.error('Ha ocurrido un error actualizando la nota verifique ' + err))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            id: String(noteList.length + 1),
            content: value,
            important: Math.random() > 0.5
        }
        noteService
            .createElement(newNote)
            .then(response => setNoteList(prevList => prevList.concat(response.data)))
    }
    return (
        <div>
            <h4>Axios Notes</h4>
            <tt>
                This React component, AxiosNotes, fetches and displays a list of notes from a JSON server using Axios for HTTP requests.
                It includes functionality to toggle the importance of each note and to add new notes.
                The notes are displayed with their content and importance status, and each note has a button to toggle its importance.
            </tt>
            <div>
                {noteList &&
                    noteList.map(note => <Note key={note.id} note={note} toogleImportance={toogleImportance} />)
                }
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" onChange={(e) => setvalue(e.target.value)} value={value} />
                    <button type="submit">Add Note</button>
                </form>
            </div>
        </div>
    )
}

function Note({ note, toogleImportance }) {
    return (
        <div key={note.id} className="axiosNotes">
            <small>{note.id}</small>
            <h4>{note.content}</h4>
            <em>{note.important ? 'Important' : 'Not-important'}</em>
            <button onClick={() => toogleImportance(note.id)}>Toogle importance</button>

        </div>
    )
}
export default AxiosNotes