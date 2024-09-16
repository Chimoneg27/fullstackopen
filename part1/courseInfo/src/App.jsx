import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>
      <div>{counter}</div>
    </div>
  )
}

export default App

/*
function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10
      },
      {
        name: "Using props to pass data",
        exercise: 7
      },
      {
        name: "State of a component",
        exercise: 14
      }
    ]
  }

  const Header = (props) => {
    console.log(props)
    return <h1>{props.course.name}</h1>
  }

  const Part = (props) => {
    return (
      <p>
        {props.name} {props.number}
      </p>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part name={props.parts[0].name} number={props.parts[0].exercise} />
        <Part name={props.parts[1].name} number={props.parts[1].exercise} />
        <Part name={props.parts[2].name} number={props.parts[2].exercise} />
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>
        Number of exercises{" "}
        {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}
      </p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
*/