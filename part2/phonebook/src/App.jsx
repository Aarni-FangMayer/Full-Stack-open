import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import NotificationDelete from './components/NotificationDelete'

const App = () => {

  /*all states*/
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationDelete, setNotificationDelete] = useState(null)

  useEffect(() => {
    personService.getAll().then(setPersons)
    .catch(error => console.error('GET error:', error))
  }, [])


  /*adding a new name in the list*/
  const addName = (event) => {
    event.preventDefault()
    const existentPerson = persons.find(person => person.name === newName)

    if(existentPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatedNumber = {...existentPerson, number: newNumber}
        personService.update(existentPerson.id, updatedNumber)
          .then(updatedPerson => {
            setPersons(persons.map(person => 
              person.id !== existentPerson.id ? person : updatedPerson
            ))
            setNewName('');
            setNewNumber('');
          })
          .catch(error => console.log('Error while editing number', error))
      }
    return    
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObject).then(person =>{
        setPersons(persons.concat(person));
        setNotification(`Contact ${personObject.name} has sucsessfully added to the phonebook!`);
        setTimeout(() => setNotification(null), 5200)
    })
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
          setPersons(persons.filter(person => person.id !== id));
          setNotificationDelete(`Contact has been deleted`);
          setTimeout(() => setNotificationDelete(null),5200)
        })
        .catch(error => {
          console.log('Delete failed:', error)
        })
    }
  }

  /*name filter*/
  const filteredPersons = persons.filter(person =>
    person?.name?.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={searchName} onChange={handleSearchName}/>
      
      <h2>Add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Notification message={notification} />

      <h2>Numbers</h2>
      <Persons filtered={filteredPersons} onDelete={handlePersonDelete}/>
      <NotificationDelete message={notificationDelete} />
    </>
  )
}

export default App
