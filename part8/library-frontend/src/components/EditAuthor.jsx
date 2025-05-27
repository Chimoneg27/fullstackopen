import { useState } from "react";
import Select from "react-select"
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from "../services/queries";

const EditAuthor = () => {
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_BOOKS}, {query: ALL_AUTHORS}  ]
  })

  const { data, loading } = useQuery(ALL_AUTHORS)
  const [selectedAuthor, setSelectedAuthor] = useState('')
  if (loading) return <div>Loading...</div>
  const authorOptions = data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  }))

  const submit = (event) => {
    event.preventDefault()
    if (!selectedAuthor) return

    changeBorn({
        variables: {
            name: selectedAuthor.value, 
            born
        }
    })

    selectedAuthor(null)
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>

      <form onSubmit={submit}>
        <div>
          Author: <Select
            options={authorOptions}
            value={selectedAuthor}
            onChange={setSelectedAuthor}
          />
        </div>
        <div>
            born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor