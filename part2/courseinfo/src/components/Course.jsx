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

export default Course