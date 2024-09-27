const Course = ({ course }) => {
  return (
    <div>
    {course.map((program) => {
      return (
        <>
        <h2 key={program.id}>{program.name}</h2>
        
        <ul>
          {program.parts.map((lesson) => {
            return <li key={lesson.id}>{lesson.name} {lesson.exercises}</li>
          })}
        </ul>

        <p>total of {program.parts.reduce((total, num) => total + num.exercises,0)} exercises</p>
        </>
      )
    })}
    </div>
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
      ]
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


  return <Course course={courses} />
}

export default App