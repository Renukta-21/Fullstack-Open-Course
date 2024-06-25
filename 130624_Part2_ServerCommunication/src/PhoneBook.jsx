import { useState, useEffect } from 'react'
import data from './dbPhone.json'

//"This application does not support registrations with repeated names and has search filters." EDUARDO DANIEL URBINA MARTINEZ

const PhoneBook = () => {
    const [persons, setPersons] = useState(data)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log(newName)
    }, [newName])
    const handleChange = (e) => setNewName(e.target.value)
    const handleNumbChange = (e) => setNewNumber(e.target.value)
    const handleFilter = (e) => setNewFilter(e.target.value)

    const doFilter = () => {
        return persons.filter(person => person.name.includes(newFilter))
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        if (newName !== '' && newNumber !== '') {
            if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
                alert(`${newName} is already booked`)
                setNewName('')
                return
            }
            const newPerson = {
                name: newName,
                number: newNumber,
            }
            setPersons(prevPersons => [...prevPersons, newPerson])
            setNewName('')
            setNewNumber('')
        }

    }
    return (
        <div>
            <h2>Phonebook</h2>
            <tt>This application does not support registrations with repeated names and has search filters.</tt>
            <AddNewPerson handleSubmit={handleSubmit} handleChange={handleChange} handleNumbChange={handleNumbChange} newName={newName} newNumber={newNumber} />
            <h2>Contacts</h2>
            <FilterInput handleFilter={handleFilter} />
            <h4>{newFilter}</h4>
            <br />
            {persons.length > 0 && <ContactList filteredPersons={doFilter()} />}
        </div>
    )
}

function FilterInput({ handleFilter }) {
    return (
        <div><h5>Filter by name</h5> <input type="text" onChange={handleFilter} />
        </div>
    )
}
function AddNewPerson({ handleSubmit, handleChange, handleNumbChange, newName, newNumber }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input onChange={handleChange} value={newName} />
                number: <input onChange={handleNumbChange} value={newNumber} />
                <br />
                <button type="submit">add</button>

            </div>
        </form>
    )
}
function ContactList({ filteredPersons }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
            </thead>
            <tbody>
                {filteredPersons.map((person) => <tr key={person.name}>
                    <td>{person.name}</td>
                    <td>{person.number}</td>
                </tr>)}
            </tbody>
        </table>
    )
}
export default PhoneBook