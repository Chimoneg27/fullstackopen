function App() {
  const course = 'Half Stack application development'

  const part1 = {
    name: "Fundamentals of React",
    exercise: 10
  }

  const part2 = {
    name: "Using props to pass data",
    exercise: 7
  }

  const part3 = {
    name: "State of a component",
    exercise: 14
  }

  const Header = (props) => {
    console.log(props)
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p>{props.name} {props.number}</p>
    )
  }  
  
  const Content = () => {
    return (
      <div>
        <Part name={part1.name} number={part1.exercise}/>
        <Part name={part2.name} number={part2.exercise}/>
        <Part name={part3.name} number={part3.exercise}/>
      </div>
    )
  }

  const Total = () => {
    return (
      <p>Number of exercises {part1.exercise + part2.exercise + part3.exercise}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises1={part1.exercise} exercises2={part2.exercise} exercises3={part3.exercise} />
    </div>
  )
}

export default App
