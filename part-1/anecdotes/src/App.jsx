import { useState } from 'react'
const App = () => {
  // Helper function to initialize an array of zeroes
  const initArray0 = (length) => {
    return Array(length).fill(0)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initArray0(anecdotes.length))

  // create a random number between 0 and the length of the anecdotes array
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  

  //count the vote
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  // find the index of the anecdote with the most votes
  const getAnecdoteWithMostVotes = () => {
    const maxVotes = Math.max(...votes)  // Get the maximum number of votes
    const mostVotedIndex = votes.indexOf(maxVotes)  // Find the index of the anecdote with the most votes
    return mostVotedIndex
  }

  const mostVotedIndex = getAnecdoteWithMostVotes()


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick = {vote}>Vote</button>
      <button onClick={randomAnecdote}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {votes[mostVotedIndex] > 0 ? (
        <div>
          <p>{anecdotes[mostVotedIndex]}</p>
          <p>Has {votes[mostVotedIndex]} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  )
}

export default App