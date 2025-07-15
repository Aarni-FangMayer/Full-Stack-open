import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics  = (props) => {
    return (
      <>
        <p>All: {props.total}</p>
        <p>Average: {props.averageScore}</p>
        <p>Positive: {props.positiveFeedback}%</p>
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

  const total = good + neutral + bad;

  const averageScore = total === 0 ? 0 : (good - bad) / total;

  const positiveFeedback = total === 0 ? 0 : (good / total) * 100;

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={onGoodClick} text="good"/>
      <Button onClick={onNeutralClick} text="neutral"/>
      <Button onClick={onBadClick} text="bad"/>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      {total === 0 ? (<p>No feedbacks given yet</p>) : (<Statistics  total={total} averageScore={averageScore} positiveFeedback={positiveFeedback}/>)}
    </>
  )
}

export default App