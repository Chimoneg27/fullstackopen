import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../services/queries"

const Books = () => {
  const books = useQuery(ALL_BOOKS)
  
  if (books.loading) {
    return <div>loading...</div>
  }

  if (books.error) {
    return <div>Error: {books.error.message}</div>
  }

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
          {books.data.allBooks.map((book) => (
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