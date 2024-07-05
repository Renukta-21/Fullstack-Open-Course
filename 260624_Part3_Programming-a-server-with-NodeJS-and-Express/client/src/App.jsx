import { useEffect, useState } from 'react'


const baseURL = `http://localhost:3001/contacts`

function App() {
  const [contacts, setContacts] = useState(null)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [updatedName, setUpdatedName] = useState('')
  const [updatedNumber, setUpdatedNumber] = useState('')
  const [updatingContact, setUpdatingContact] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${baseURL}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ha ocurrido un error con la peticion')
        }
        return response.json()
      })
      .then(data => setContacts(data))
      .catch(err => console.log("error: " + err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContact = {
      name: name,
      number: number
    }
    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (!res.ok) return res.json().then(err => { throw new Error(err.error) })
      return res.json()
    })
      .then((response) => {
        setContacts(prevList => prevList.concat(response))
        setName('')
        setNumber('')
        setError(null)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
  }
  const handleDelete = id => {
    fetch(`${baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))
  }
  const handleUpdate = (id) => {
    const updatedContact = {
      name: updatedName,
      number: updatedNumber,
      id: id
    }
    fetch(`${baseURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedContact),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(() => {
        alert('Contact has been updated :)')
        setContacts(prevContacts => prevContacts.map(contact => contact.id !== id ? contact : updatedContact))
        setUpdatedName('')
        setUpdatedName('')
        setUpdatingContact(null)
      })
      .catch(err => console.log('An error has ocurred ' + err))

  }
  return (
    <div>
      <h2>Phonebook RESTful</h2>
      {error &&
        <div className='errBox'>
          <h4>Error</h4>
          <p>{error.message}</p>
        </div>}
      {contacts &&
        contacts.map(contact => (
          <div key={contact.id} className='card'>
            <div>
              <h4>{contact.id}</h4>
              <p>{contact.name}</p>
              <p>{contact.number}</p>
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </div>
            <div>
              <button onClick={() => {
                setUpdatingContact(contact.id)
                setUpdatedName('')
                setUpdatedNumber('')
              }}>Edit</button>
              {updatingContact && updatingContact === contact.id &&
                <div>
                  <br />
                  <input type="text" onChange={e => setUpdatedName(e.target.value)} value={updatedName} />
                  <input type="text" onChange={e => setUpdatedNumber(e.target.value)} value={updatedNumber} />
                  <button onClick={() => handleUpdate(contact.id)}>Update</button>
                </div>
              }
            </div>
          </div>
        )
        )
      }
      <form onSubmit={handleSubmit}>
        Name<input type="text" onChange={e => setName(e.target.value)} value={name} />
        Number <input type="text" onChange={e => setNumber(e.target.value)} value={number} />
        <button>POST</button>
      </form>
    </div>
  )
}

export default App