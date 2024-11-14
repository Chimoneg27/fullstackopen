const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Load environment variables from .env file
const result = dotenv.config()
if (result.error) {
  console.error("Error loading .env file:", result.error)
} else {
  console.log(".env file loaded successfully")
}

// Check if the MongoDB URI is loaded correctly
const url = process.env.MONGODB_URI
console.log("MongoDB URI from .env:", url) // Debug log to check the URI

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

mongoose.set('strictQuery', false)

// Connect to MongoDB
if (url) {
  mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error))
} else {
  console.error("MongoDB URI is undefined. Check your .env file.")
}

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
