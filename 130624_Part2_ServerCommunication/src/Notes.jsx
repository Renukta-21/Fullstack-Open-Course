import { useState } from "react"
import { notes } from "./notes"

function Notes() {

    const [inValue, setInValue] = useState('')
    const [notesList, setNotesList] = useState(notes)


    function handleSubmit(e) {
        e.preventDefault()
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
            <tt>Fullstack Open Practice - Second Section Course</tt>
            <table>
                <thead>
                    <tr>
                        <th>Note</th>
                        <th>Importance</th>
                    </tr>
                </thead>
                <tbody>
                    {notesList.map(note=><NoteLine key={note.id} note={note}/>)}
                </tbody>
            </table>
            <form action="POST" onSubmit={handleSubmit}>
                <input type="text"value={inValue} autoFocus onChange={e=>setInValue(e.target.value)} placeholder="Add a note here"/>
                <button>Add Note</button>
            </form>
            <p>&copy; EDUARDO DANIEL URBINA MARTINEZ &copy;</p>
        </div>
    )
}

function NoteLine({note}){
    const {content, important} = note 
    return(
        <tr>
            <td>{content}</td>
            <td className={important?'impCeld':''}><span className={note.important ? "important" : 'not-important'}>{note.important?'important':'not-important'}</span></td>
        </tr>
    )
}
export default Notes