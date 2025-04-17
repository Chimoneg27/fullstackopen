import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(userLogin({
      username,
      password
    }))
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          data-testid="username"
          name="username"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          data-testid="password"
          name="password"
          id="password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm