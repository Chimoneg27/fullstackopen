const Course = ({ course }) => {
  return (
    <>
    <h1>{course.name}</h1>

    <ul>
      {course.parts.map(
        (lesson) => {
          return <li key={lesson.id}>{lesson.name} {lesson.exercises}</li>
        }
      )}
    </ul>

    <p>total of {course.parts.reduce((total, num) => total + num.exercises,0)} exercises</p>
    </>
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
      }
    ]
  }

  return <Course course={course} />
}

export default App