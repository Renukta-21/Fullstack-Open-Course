import { useEffect, useState } from 'react'
//Eduardo Daniel Urbina Martinez Open Fullstack Part 2

function FetchNotes() {
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('')
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json()).then(data => setNotes(data))

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newNoteObj = {
            title: newNote,
            body: newNote,
            userId: 1,
        }

        const noteToSend = JSON.stringify(newNoteObj)
        fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: "POST",
            body: noteToSend,
            headers:{
                'Content-type': 'application/json' ,
            },
        }).then((response) => response.json()).then(json=>console.log(json))
    }
    const handleChange = (e) => setNewNote(e.target.value)
    return (
        <div>
            <h2>Fetched Notes</h2>
            {notes && <NoteList notes={notes} />}
            <form action="" onSubmit={handleSubmit}>
                <input type="text" id='addNote' placeholder='Type Note Here' onChange={handleChange} />
                <button type="submit" >Add Note</button>
            </form>
        </div>
    )
}
function NoteList({ notes }) {
    return (
        <div>
            {
                notes.map(note => (
                    <div key={note.id} className='noteCard'>
                        <h4>{note.title}</h4>
                        <hr />
                        <i>{note.body}</i>
                    </div>
                ))
            }
        </div>
    )
}
export default FetchNotes