const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://chimonegarvin27:${password}@cluster1.9bvc8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster1`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
  content: "Hole, me llamo Garvin. Como tu llamos",
  important: true
})

note.save().then((result) => {
  console.log("note saved!")
  mongoose.connection.close()
})
