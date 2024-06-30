import { useEffect, useState } from 'react'


const baseURL = `/contacts`

function App() {
  const [contacts, setContacts] = useState(null)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  useEffect(() => {
    fetch(baseURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ha ocurrido un error con la peticion')
        }
        return response.json()
      })
      .then(data => setContacts(data))
      .catch(err => console.log(err.message))
  }, [name])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContact = {
      name: name,
    }
    fetch(baseURL, {
      method: "POST",
      body: name!=='' ? JSON.stringify(newContact): undefined,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      name!==''&& setContacts(prevList => prevList.concat({id:data.id, ...newContact}))
      setName('')
      setNumber('')
    })
  }

  return (
    <div>
      <h2>Phonebook RESTful</h2>
      {contacts &&
        contacts.map(contact => (
          <div key={contact.id} className='card'>
            <h4>{contact.id}</h4>
            <p>{contact.name}</p>
            <p>{contact.number}</p>
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