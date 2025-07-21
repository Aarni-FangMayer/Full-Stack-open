import { useEffect, useState } from 'react'
import axios from 'axios'
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })

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

    const nameObject = {
      name: newName,
      number: newNumber,
    }
    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response =>
        setPersons(persons.concat(response.data))
      )
    setNewName('');
    setNewNumber('');
  }

  /*event handlers*/
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleSearchName = (event) => {setSearchName(event.target.value)}

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
      <Persons filtered={filteredPersons} />
    </>
  )
}

export default App
