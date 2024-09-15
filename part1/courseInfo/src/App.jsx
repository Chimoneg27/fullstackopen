function App() {
  const course = 'Half Stack application development'

  const parts = [
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
  }]

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
        <Part name={parts[0].name} number={parts[0].exercise}/>
        <Part name={parts[1].name} number={parts[1].exercise}/>
        <Part name={parts[2].name} number={parts[2].exercise}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.parts}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises1={parts[0].exercise} exercises2={parts[1].exercise} exercises3={parts[2].exercise} />
    </div>
  )
}

export default App
