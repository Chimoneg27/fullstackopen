const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://chimonegarvin27:${password}@cluster1.9bvc8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster1`

mongoose.set("strictQuery", false)

mongoose.connect(url)

// define what values go into the note
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

// the singular nonte is the name of the model
const Note = mongoose.model("Note", noteSchema)

const note = new Note({
  content: "Hoy es miercoles",
  important: true
})

note.save().then((result) => {
  console.log("note saved!")
  console.log(result)
  mongoose.connection.close()
})
