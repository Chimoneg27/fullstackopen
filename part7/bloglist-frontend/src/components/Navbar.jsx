import { Link } from 'react-router-dom'

const Navbar = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        users
      </Link>
      <Link style={padding} to="/create">
        home
      </Link>
    </div>
  )
}

export default Navbar