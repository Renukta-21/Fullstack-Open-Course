import { useState } from "react"

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const calcAverage = () => {
    const total = good + neutral + bad
    if (total === 0) return 0
    return (good - bad) / total
  }
  const calcPositiveRev = () => {
    const total = good + bad + neutral
    if (total === 0) return 0
    return (good / total) * 100
  }

  return (
    <div>
      <Button handleGood={handleGood} handleBad={handleBad} handleNeutral={handleNeutral} />
      <Statistics good={good} neutral={neutral} bad={bad} calcAverage={calcAverage} calcPositiveRev={calcPositiveRev} totalFeedbacks={good + neutral + bad} />
    </div >
  )
}
const Button = (props) => (
  <div>
    <h1>Give feedback</h1>
    <button onClick={props.handleGood}>Good</button>
    <button onClick={props.handleNeutral}>Neutral</button>
    <button onClick={props.handleBad}>Bad</button>
  </div>
)
const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)
function Statistics(props) {
  const { good, neutral, bad, calcAverage, calcPositiveRev, totalFeedbacks } = props
  return (
    <div>
      <h2>Statistics</h2>
      {totalFeedbacks ?
        <Table good={good} neutral={neutral} bad={bad} calcAverage={calcAverage} calcPositiveRev={calcPositiveRev}/>
        : <p>No feedback given yet</p>}

    </div>
  )
}
function Table(props) {
  const { good, neutral, bad, calcAverage, calcPositiveRev } = props
  return (
    <table>
      <thead>
        <tr>
          <th>Aspect</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='All' value={good + neutral + bad} />
        <StatisticLine text='Average' value={`${calcAverage().toFixed(2)} %`} />
        <StatisticLine text='Positive' value={`${calcPositiveRev().toFixed(2)} %`} />
      </tbody>
    </table>
  )
}
