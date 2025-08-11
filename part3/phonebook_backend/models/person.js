const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 9, // I set the minimum value to 9 characters so that I have at least 8 numbers and "-"
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! The required format: XX-XXXXXXX or XXX-XXXXXXXX`
    },
    required: [true, 'User phone number required']
  },
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
