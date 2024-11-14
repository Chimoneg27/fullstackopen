const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const url = process.env.MONGODB_URI
 
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

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

    if(note) {
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

    if(!body.content) {
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