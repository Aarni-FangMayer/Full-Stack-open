import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Bob Dylan', number: '060-1234567'},
    { name: 'Axl Rose', number: '070-1234567'},
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const addName = (event) => {
    event.preventDefault()
    console.log('Button submit clicked', event.target);

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const nameExist = persons.some(person => person.name === newName);
    if(nameExist){
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {setNewName(event.target.value)}

  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  
  const handleSearchName = (event) => {setSearchName(event.target.value)}

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <label>filter shown with <input type="search" value={searchName} onChange={handleSearchName}/></label>  
      
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person => 
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>
    </>
  )
}

export default App