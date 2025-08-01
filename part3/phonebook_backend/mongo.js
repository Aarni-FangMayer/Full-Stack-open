const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Aarni_2_pb:${password}@cluster0.gdspmhq.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

if (!name || !number) {
  console.log('Please provide name and number as arguments')
  process.exit(1)
}

const person = new Person({
  name: name,
  number: number,
})

person.save().then(result => {
  console.log(`Added ${person.name} ${person.number} to phonebook`)
  // mongoose.connection.close()
})

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})

