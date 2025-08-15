const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message)
  })

const noteSchema = new mongoose.Schema({
  author: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  reviews: Number,
  likes: Number,
})

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Blog", noteSchema)
