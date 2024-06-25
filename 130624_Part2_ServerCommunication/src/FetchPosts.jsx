import { useEffect, useState } from 'react'
//Eduardo Daniel Urbina Martinez Open Fullstack Part 2
/*eslint-disable no-unused-vars*/

function FetchPosts() {
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('')
    useEffect(() => {
        fetch(`http://localhost:3000/posts`).then(res => res.json()).then(data => setNotes(data)).catch(err=>console.log('error fetching ' ))

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newNoteObj = {
            title: newNote,
            body: newNote,
            id: notes.length +1
        }
        const newSendingNote = JSON.stringify(newNoteObj)
        fetch(`http://localhost:3000/posts`,{
            method:"POST",
            body:newSendingNote,
            headers:{
                'Content-Type':'aplication/json'
            }
        }).then(res=>res.json()).then(setNotes(prevNotes=>prevNotes.concat(newNoteObj)))
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
                notes.map((note, index) => (
                    <div key={index} className='noteCard'>
                        <h4>{note.title}</h4>
                        <hr />
                        <i>{note.body}</i>
                    </div>
                ))
            }
        </div>
    )
}
export default FetchPosts