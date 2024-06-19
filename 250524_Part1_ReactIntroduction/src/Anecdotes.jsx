import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(generateInitialVS)

  function generateInitialVS() {
    const initalState = {}
    for (let i = 0; i < anecdotes.length; i++) {
      initalState[i] = 0
    }
    console.log(initalState)
    return initalState
  }
  const genNextQuote = (length) => {
    const random = Math.floor(Math.random() * length)
    setSelected(random)
    console.log(random)
  }
  function handleVoteUpdate() {
    const newVotes = { ...votes }
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  return (
    <div>
      <h3>{selected}</h3>
      {anecdotes[selected]}
      <hr />
      <p>Has {votes[selected]} votes</p>
      <button onClick={(handleVoteUpdate)}>Vote</button>
      <button onClick={() => { genNextQuote(anecdotes.length) }}>Next Quote</button>
      <p>No es cierto mi brother pilas</p>
      <MostVotesQuote anecdotes={anecdotes} votes={votes} />
      <small>Eduardo Daniel Urbina Martinez &copy;</small>
    </div>
  )
}

const MostVotesQuote = (props) => {
  const { votes, anecdotes } = props

  const mostVoted = () => {
    let mostVoted = null
    let maxIdx = -Infinity
    const values = Object.values(votes)

    values.forEach(function (value, idx) {
      if (value > mostVoted) {
        mostVoted = value
        maxIdx = idx
      }
    })
    return maxIdx
  }
  return (
    <div>
      {anecdotes[mostVoted()]}
    </div>
  )
}

export default App