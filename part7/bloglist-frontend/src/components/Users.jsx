import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div className='users'>
      <h2>Users</h2>

      <table border='1'>
        <tr>
          <th>users</th>
          <th>created blogs</th>
        </tr>
      </table>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </div>
  )
}

export default Users