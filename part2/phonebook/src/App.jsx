import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  /*all states*/
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    personService.getAll().then(setPersons)
    .catch(error => console.error('GET error:', error));
  }, [])


  /*adding a new name in the list*/
  const addName = (event) => {
    event.preventDefault()
    
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObject).then(person =>
        setPersons(persons.concat(person))
    )
    setNewName('');
    setNewNumber('');
  }

  /*event handlers*/
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleSearchName = (event) => {setSearchName(event.target.value)}
  const handlePersonDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)){
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Delete failed:', error)
        })
    }
  }

  /*name filter*/
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={searchName} onChange={handleSearchName}/>
      
      <h2>Add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons filtered={filteredPersons} onDelete={handlePersonDelete}/>
    </>
  )
}

export default App
