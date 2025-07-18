import { useState } from 'react'

const App = () => {
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

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState (new Array(anecdotes.length).fill(0));

  const getRandomNumber = () => {
    if (anecdotes.length <= 1) return;

    let randomNumber; 
    do {
       randomNumber = Math.floor(Math.random()*(anecdotes.length));
    } while (randomNumber === selected);
    setSelected(randomNumber);
  }

  const markAsVoted = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  let maxNum = 0;
  let indexNum = 0;
  for (let i=0; i < votes.length; i++){
    if(votes[i] > maxNum){
          indexNum = i;
          maxNum = votes[i];
    }
  }


  return (
    <>
      <h1>Anecdote of day</h1>
      <p>{anecdotes[selected].text}</p>
      -
      <i>{anecdotes[selected].author}</i>
      <br />
      <br />
      <button onClick={markAsVoted}>vote</button>
      <button onClick={getRandomNumber}>next anecdote</button>
      <p>This anecdote was voted {votes[selected]} times.</p>
      <br />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[indexNum].text}</p>
      -
      <i>{anecdotes[indexNum].author}</i>
    </>
  )
}

export default App