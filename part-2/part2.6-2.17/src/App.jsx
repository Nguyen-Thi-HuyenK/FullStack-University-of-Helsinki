import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchFilter from './components/SearchFilter';
import AddingNewPeople from './components/AddingNewPeople';
import PeopleList from './components/PeopleList';
import personService from './services/persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({ message: '', type: '' });

  useEffect(() => {
    console.log('Fetching data...');
    personService
      .getAll()
      .then(response => {
        console.log('Data fetched successfully:', response);
        setPersons(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setNotificationMessage({ message: 'Error fetching data. Please try again.', type: 'error' });
        setTimeout(() => {
          setNotificationMessage({ message: '', type: '' });
        }, 5000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    
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
            resetFields();
            setNotificationMessage({ message: `${newName}'s number updated!`, type: 'success' });
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setNotificationMessage({ message: `Error: ${newName} was not found in the phonebook.`, type: 'error' });
            } else {
              setNotificationMessage({ message: `Error updating person: ${error.response ? error.response.data.error : error.message}`, type: 'error' });
            }
            resetFields();  // Clear input fields after an error
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
          resetFields();
          setNotificationMessage({ message: `${newName} added to the phonebook!`, type: 'success' });
        })
        .catch(error => {
          setNotificationMessage({ message: `Error adding person: ${error.response ? error.response.data.error : error.message}`, type: 'error' });
          resetFields();
        });
    }
  };

  const resetFields = () => {
    setNewName('');
    setNewNumber('');
    setTimeout(() => {
      setNotificationMessage({ message: '', type: '' });
    }, 5000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  }

  const searchResults = (persons || []).filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationMessage({ message: `${name} has been deleted from the phonebook.`, type: 'success' });
          setTimeout(() => {
            setNotificationMessage({ message: '', type: '' });
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage({ message: `Error deleting person: ${error.response ? error.response.data.error : error.message}`, type: 'error' });
        });
    }
  }

  return (
    <div>
      {notificationMessage.message && (
        <div className={`notification ${notificationMessage.type}`}>
          {notificationMessage.message}
        </div>
      )}
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
      <PeopleList searchResults={searchResults} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
