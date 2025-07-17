const Courses = ({courses}) => {
  return (
    <>
      {
        courses.map(course => <Course key={course.id} course={course}/>)
      }
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}

const Header = ({courseName}) => <h2>{courseName}</h2>

const Content = ({parts}) => (
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {parts.map(part => <Part key={part.id} part={part} /> )}
      </ul>
)

const Part = ({part}) => <li>{part.name}: {part.exercises}</li>

const Total = ({parts}) => {
  const total =  parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <b>Total of {total} exercises.</b>
  )
}
 
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <>
      <h1>Web Development Curriculum</h1>
      <Courses courses={courses} />
    </>
  )
}
export default App;
