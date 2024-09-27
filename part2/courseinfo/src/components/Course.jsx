const Course = ({ course }) => {
  return (
    <div>
      {course.map((program) => {
        return (
          <>
            <h2 key={program.id}>{program.name}</h2>

            <ul>
              {program.parts.map((lesson) => {
                return (
                  <li key={lesson.id}>
                    {lesson.name} {lesson.exercises}
                  </li>
                )
              })}
            </ul>

            <p>
              total of {program.parts.reduce((total, num) => total + num.exercises, 0)} exercises
            </p>
          </>
        )
      })}
    </div>
  )
}

export default Course
