import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES } from "../services/queries"
import { useState } from "react"

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })

  const genresResult = useQuery(ALL_GENRES)

  if (loading || genresResult.loading) return <div>loading...</div>
  if (error || genresResult.error) return <div>Error: {error?.message || genresResult.error?.message}</div>
  if (!data || !data.allBooks) return <div>No books found.</div>

  const genres = genresResult.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? <p>in genre <strong>{selectedGenre}</strong></p> : <p>All genres</p>}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
