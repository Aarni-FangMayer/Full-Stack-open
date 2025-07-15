import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics  = ({good, neutral, bad}) => {
  const total = good + neutral + bad;

  const averageScore = total === 0 ? 0 : (good - bad) / total;

  const positiveFeedback = total === 0 ? 0 : (good / total) * 100;

  if (total === 0 ) {
    return <p>No feedbacks given yet</p>
  }
  return (
    <>
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={averageScore} />
        <StatisticLine text="Positive" value={positiveFeedback + "%"} />
      </tbody>
    </table>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
    <tr>
      <td>
        {props.text}:
      </td>
      <td>
        {props.value}
      </td>
    </tr>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => {
    console.log("Good button clicked");
    setGood(good + 1);
  }
  const onNeutralClick = () => {
    console.log("Neutral button clicked");
    setNeutral(neutral + 1);
  }
  const onBadClick = () => {
    console.log("Bad button clicked");
    setBad(bad + 1);
  }

  

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={onGoodClick} text="good"/>
      <Button onClick={onNeutralClick} text="neutral"/>
      <Button onClick={onBadClick} text="bad"/>
      
      <h1>Statistics</h1>
      <Statistics  good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App