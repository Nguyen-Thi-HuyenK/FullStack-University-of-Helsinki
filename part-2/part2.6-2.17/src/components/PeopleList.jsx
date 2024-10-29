import Person from './Person';

const PeopleList = ({ searchResults }) => {
    return (
        <ul style={{listStyleType: 'none'}}>
            {searchResults.map(person => <Person key={person.name} person={person} />)}
        </ul>
    )
}

export default PeopleList;