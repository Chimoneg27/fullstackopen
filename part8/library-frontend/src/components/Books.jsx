import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../services/queries"

const Books = () => {
  const { data, loading, error } = useQuery(ALL_BOOKS)

  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data || !data.allBooks) return <div>No books found.</div>

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default Books