const Header = (props) => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part = {props.parts[0]} />
      <Part part = {props.parts[1]} />
      <Part part = {props.parts[2]} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part.name}: {props.part.exercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <b>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</b>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],
  }
  
  return (
    <>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}
export default App;
