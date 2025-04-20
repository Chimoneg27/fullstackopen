import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'

const Navbar = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }

  const listStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '10px',
    padding: 0,
    margin: 0
  }

  const navStyle = {
    backgroundColor: 'grey',
    padding: '10px 20px'
  }

  const handleLogout = () => {
    dispatch(userLogout())
  }

  return (
    <nav style={navStyle}>
      <ul style={listStyle}>
        <li>
          <Link style={padding} to='/'>blogs</Link>
        </li>
        <li>
          <Link style={padding} to='/users'>users</Link>
        </li>
        <li>
          {user.name} logged in
        </li>
        <li>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
