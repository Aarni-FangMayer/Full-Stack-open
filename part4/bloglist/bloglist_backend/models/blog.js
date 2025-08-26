const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const noteSchema = new mongoose.Schema({
  author: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  reviews: Number,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", noteSchema);
