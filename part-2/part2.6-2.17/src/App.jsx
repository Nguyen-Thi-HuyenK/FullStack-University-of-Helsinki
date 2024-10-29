import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchFilter from './components/SearchFilter';
import AddingNewPeople from './components/AddingNewPeople';
import PeopleList from './components/PeopleList';

const App = () => {
  const [persons, setPersons] = useState ([ ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    // check if the name is already in the phonebook
    const nameExists = persons.some(person => person.name === newName);

    if (nameExists) {
      alert (`${newName} is already added to the phonebook`);
      setNewName('');
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  }

  const searchResults = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

return (
  <div>
      <h2>Phonebook</h2>
      <SearchFilter searchName={searchName} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <AddingNewPeople 
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <PeopleList searchResults={searchResults}/>
  </div>
  
)
}

export default App;