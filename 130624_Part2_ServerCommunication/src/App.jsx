const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(function(note, idx){
          return <Note key={note.id} note={note.content}/>
        })}
      </ul>
    </div>
  )
}

const Note =({note})=>(<li>{note}</li>)

export default App