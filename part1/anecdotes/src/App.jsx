import { useState } from 'react'

const App = () => {
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    {
      id: 1,
      author: "Brooks Law", 
      text: "Adding manpower to a late software project makes it later!"
    },
    {
      id: 2,
      author: "Jim Highsmith",
      text: "The best way to get a project done faster is to start sooner"
    },
    {
      id: 3,
      author: "Tom Cargill",
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time."
    },
    {
      id: 4,
      author: "Fred Brooks",
      text: "Even the best planning is not so omniscient as to get it right the first time."
    },
    {
      id: 5,
      author: "Martin Fowler",
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
    },
    {
      id: 6,
      author: "Antoine de Saint-Exupery",
      text: "Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away"
    },
  ]

  const getRandomNumber = () => {
    if (anecdotes.length <= 1) return;

    let randomNumber; 
    do {
       randomNumber = Math.floor(Math.random()*(anecdotes.length));
    } while (randomNumber === selected);
    setSelected(randomNumber);
  }

  return (
    <>
      <p>{anecdotes[selected].text}</p>
      -
      <i>{anecdotes[selected].author}</i>
      <br />
      <br />
      <button onClick={getRandomNumber}>next anecdote</button>
    </>
  )
}

export default App