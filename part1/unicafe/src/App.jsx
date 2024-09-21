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

const Statistics = ({title, good, neutral, bad}) => {
  if(good === 0 && neutral === 0 && bad === 0) {
    return (
      <h2>No feedback given</h2>
    )
  }

  return (
    <div>
      <h2>{title}</h2>
      <Paragraph text={'good'} rating={good}/>
      <Paragraph text={'neutral'} rating={neutral}/>
      <Paragraph text={'bad'} rating={bad}/>
      <Paragraph text={'average'} rating={(bad + good + neutral) / 3}/>
      <Paragraph text={'positive'} rating={(bad + good + neutral) === 0 ? '0%' : `${(good / (bad + good + neutral)) * 100}%`} />
    </div>
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

      <Statistics title='statistics' good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
