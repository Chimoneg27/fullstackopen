import { useState } from "react"

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({ title, good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <h2>No feedback given</h2>
  }

  return (
    <div>
      <h2>{title}</h2>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"average"} value={(bad + good + neutral) / 3} />
      <StatisticLine
        text={"positive"}
        value={bad + good + neutral === 0 ? "0%" : `${(good / (bad + good + neutral)) * 100}%`}
      />
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

      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <Statistics title="statistics" good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
