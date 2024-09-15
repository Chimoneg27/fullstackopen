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
  
  const Content = (props) => {
    return (
      <div>
        <Part name={props.parts[0].name} number={props.parts[0].exercise}/>
        <Part name={props.parts[1].name} number={props.parts[1].exercise}/>
        <Part name={props.parts[2].name} number={props.parts[2].exercise}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default App
