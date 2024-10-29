const AddingNewPeople = ({newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {

    return (
        <form onSubmit={addPerson}>  {/* this function need to prevent the default action of submitting html forms */}
                <div> Name: 
                    <input 
                    value={newName}
                    onChange={handleNameChange}/>
                </div>
                <div> Number:
                    <input 
                    value={newNumber}
                    onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type='submit'>Add</button>
                </div>
            </form>
    )
}

export default AddingNewPeople;