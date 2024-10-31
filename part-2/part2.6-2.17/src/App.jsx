import {useState, useEffect} from 'react';
import axios from 'axios';
import SearchFilter from './components/SearchFilter';
import AddingNewPeople from './components/AddingNewPeople';
import PeopleList from './components/PeopleList';
import personService from './services/persons';
const App = () => {
  const [persons, setPersons] = useState ([ ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled', response);
        setPersons(response);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  
    const existingPerson = persons.find(person => person.name === newName);
  
    // Check if the person already exists
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with the new one?`
      );
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : response
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
  
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };
  

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

  const searchResults = (persons || []).filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then( () => {
          setPersons((persons || []).filter(person => person.id !== id));
        })
    }
  }

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
      <PeopleList searchResults={searchResults} deletePerson={deletePerson }/>
  </div>
)}

export default App;