// const mongoose = require("mongoose") /* extract to app.js */
mongoose.set("strictQuery", false);

// const url = process.env.MONGODB_URI /* extract to app.js */

// console.log("connecting to", url) /* extract to app.js */

// mongoose.connect(url) /* extract to app.js */
//   .then(() => {
//     console.log("connected to MongoDB")
//   })
//   .catch(error => {
//     console.log("error connecting to MongoDB:", error.message)
//   })

const noteSchema = new mongoose.Schema({
  author: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  reviews: Number,
  likes: Number,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", noteSchema);
