import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <div>
        {user.blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        )
        }
      </div>
    </div>
  )
}

export default User