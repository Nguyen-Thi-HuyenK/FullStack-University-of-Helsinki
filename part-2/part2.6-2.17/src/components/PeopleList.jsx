import Person from './Person';

const PeopleList = ({ searchResults, deletePerson}) => {
    return (
        <ul style={{listStyleType: 'none'}}>
            {searchResults.map(person => (
                <Person
                    key={person.id}
                    person={person}
                    deletePerson={deletePerson}
                />
            ))}
        </ul>
    )
}

export default PeopleList;