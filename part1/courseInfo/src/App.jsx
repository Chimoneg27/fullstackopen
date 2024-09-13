function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => {
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
        <Part name={part1} number={exercises1}/>
        <Part name={part2} number={exercises2}/>
        <Part name={part3} number={exercises3}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
