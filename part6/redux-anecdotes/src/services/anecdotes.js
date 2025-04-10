import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseURL, object)
  return response.data
}

const castVotes = async (anecdote) => {
  const obj = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseURL}/${anecdote.id}`, obj)
  return response.data
}

export default { getAll, createNew, castVotes }