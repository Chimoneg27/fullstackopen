import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, zero } from './store'

function App() {
  const counter = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => dispatch(increment())}>plus</button>
      <button onClick={() => dispatch(decrement())}>minus</button>
      <button onClick={() => dispatch(zero())}>zero</button>
    </div>
  )
}

export default App
