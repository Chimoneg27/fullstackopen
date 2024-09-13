import PropTypes from 'prop-types';

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

function App() {
  const name = 'Garvin'
  const age = 22
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age}/>
    </div>
  )
}

Hello.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
}

export default App
