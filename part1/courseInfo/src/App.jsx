import { useState } from 'react'

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)

  return (
    <div>
      <Display counter={counter} />
      <Button 
        onClick={increaseByOne}
        text='plus'
      />
      <Button 
        onClick={setToZero}
        text='zero'
      />
      <Button 
        onClick={decreaseByOne}
        text='minus'
      />
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