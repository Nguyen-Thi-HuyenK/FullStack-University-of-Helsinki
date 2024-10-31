const Person = ({ person, deletePerson }) => {
    return (
        <li>
            {person.name} {person.number}
            <button 
                onClick={() => deletePerson(person.id, person.name)}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'lightblue'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}             
                >
                Delete
            </button>
        </li>
    )
    }

export default Person;