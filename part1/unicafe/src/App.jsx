import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Paragraph = (props) => {
  return (
    <p>
      {props.text} {props.rating}
    </p>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>

      <Button text='good' handleClick={() =>setGood(good + 1)}/>
      <Button text='neutral' handleClick={() =>setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() =>setBad(bad + 1)}/>

      <h2>statistics</h2>

      <Paragraph text={'good'} rating={good}/>
      <Paragraph text={'neutral'} rating={neutral}/>
      <Paragraph text={'bad'} rating={bad}/>
      <Paragraph text={'average'} rating={(bad + good + neutral) / 3}/>
      <Paragraph text={'positive'} rating={good / (bad + good + neutral) * 100}/>
    </div>
  )
}

export default App
