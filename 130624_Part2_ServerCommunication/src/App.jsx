import { useState } from "react"
import { notes } from "./notes"

function App() {

    const [inValue, setInValue] = useState('')
    const [notesList, setNotesList] = useState(notes)
    const [actFilter, setActFilter] = useState(false)
    const [isImportant, setIsImportant] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        const newNote = {
            content: inValue,
            id: notesList.length + 1,
            important: isImportant
        }
        //Just another way to update state
        /* const newList = [...notesList, newNote]
        setNotesList(newList) */
        setNotesList(prevList => {
            return [...prevList, newNote]
        })

        setInValue('')

    }
    const handleFilter = () => setActFilter(!actFilter)
    const handleDeleteAll = () => {
        const allRows = document.querySelectorAll('.tr')
        allRows.forEach((row, index) => {
            setTimeout(()=>{
                row.classList.add('slide-out')
                setTimeout(()=>{
                    setNotesList(prevNotes => prevNotes.filter(note=>note.id!==index+1))
                },300)
            },index*300)
        })
    }

    const handleDelete = (id) => {
        const deletingRow = document.getElementById(`tr-${id}`)
        deletingRow.classList.add('slide-out')
        setTimeout(() => {
            setNotesList(notesList.filter(note => note.id !== id))
        }, 500)
    }
    return (
        <div className="card">
            <h2>Notes List</h2>
            <tt>Fullstack Open Practice - Second Section Course</tt>
            <table>
                <thead>
                    <tr>
                        <th>Note</th>
                        <th>Importance</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {notesList.filter(note => {
                        if (actFilter === true) return note.important == true
                        return note
                    }).map(note => <NoteLine key={note.id} note={note} handleDelete={handleDelete} />)}
                </tbody>
            </table>
            <form action="POST" onSubmit={handleSubmit}>
                <input type="text" value={inValue} autoFocus onChange={e => setInValue(e.target.value)} placeholder="Add a note here" />
                <div className="check">
                    <label htmlFor="importance">important</label>
                    <input type="checkbox" name="importance" id="importance" onChange={(e) => setIsImportant(e.target.checked)} />
                </div>
                <button>Add Note</button>
            </form>
            <div className="middButton">
                <button onClick={handleFilter}>{actFilter ? 'Show all' : 'Filter important'}</button>
                {notesList.length > 0 && <button onClick={handleDeleteAll}>Delete all</button>}

            </div>
            {/* <button className="middButton">Filter important</button> */}
            {/* <p>&copy; EDUARDO DANIEL URBINA MARTINEZ &copy;</p> */}
        </div>
    )
}

function NoteLine({ note, handleDelete }) {
    const { content, important, id } = note
    return (
        <tr id={`tr-${id}`} className="tr">
            <td>{content}</td>
            <td className={important ? 'impCeld' : ''}><span className={note.important ? "important" : 'not-important'}>{note.important ? 'important' : 'not-important'}</span></td>
            <td className="delButton"><button onClick={() => handleDelete(id)}></button></td>
        </tr>
    )
}
export default App