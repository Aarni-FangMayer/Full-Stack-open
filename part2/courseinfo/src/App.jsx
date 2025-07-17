const Course = ({course}) => {
  return (
    <>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}

const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({parts}) => (
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {parts.map(part => <Part key={part.id} part={part} /> )}
      </ul>
)

const Part = ({part}) => <li>{part.name}: {part.exercises}</li>

const Total = ({parts}) => {
  const total =  parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <p>Total of {total} exercises.</p>
  )
}
 
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ],
  }
  
  return (
    <>
      <Course course={course} />
    </>
  )
}
export default App;
