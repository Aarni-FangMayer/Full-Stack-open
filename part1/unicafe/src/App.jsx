import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
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
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </>
  )
}

export default App