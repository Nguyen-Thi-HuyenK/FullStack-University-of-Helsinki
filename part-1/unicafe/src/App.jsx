import {useState} from 'react'

//component Button
const Button =({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}
//compoent StatisticLine
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

// component Statistics
const Statistics = ({good, neutral, bad}) => {
  const sumFB = good + neutral + bad
  const avgFB = sumFB === 0 ? 0 : (good - + 0 - bad) / sumFB
  const posFB = sumFB === 0 ? 0 : good / sumFB * 100

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text ='Good' value = {good}/>
          <StatisticLine text ='Neutral' value = {neutral}/>
          <StatisticLine text ='Bad' value = {bad}/>
          <StatisticLine text ='All' value = {sumFB}/>
          <StatisticLine text ='Average' value = {avgFB}/>
          <StatisticLine text ='Positive' value = {posFB + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const withFeedback = good > 0 || neutral > 0 || bad > 0

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='Good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='Bad'/>
      <h1>Statistics</h1>
      {withFeedback ? <Statistics good={good} neutral={neutral} bad={bad}/> : <p>No feedback given</p>}
    </div>
  )
}

export default App