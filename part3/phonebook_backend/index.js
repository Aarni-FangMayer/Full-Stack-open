require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('type', function(req, res){ return req.headers['content-type'] })

morgan.token('body', (req) => {
  if(req.method === 'POST' && req.body){
    const { name, number } = req.body
    return JSON.stringify({ name, number })
  } return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = []

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(personsCount => {
    const currentTime = new Date()
    response.send(`<p>Phonebook has info for ${personsCount} people</p><p>${currentTime}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
    if(person) response.json(person)
      else response.status(404).end()
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
})

app.post('/api/persons/', (request, response) => {
  const {name, number} = request.body
  const person = new Person({name, number})

  if(!person.name || !person.number){
    console.log("Please provide your name and phone number.")
    return response.status(400).json({ error: 'name or number missing' })
  }

  Person.findOne({ name }).then(existsPerson => {
    if(existsPerson){
    console.log("This name is already registered.")
    return response.status(400).json({ error: 'Name must be uniqe' })
  }
  person.save().then(newPerson => response.json(newPerson))
  })
})

app.put('/api/persons/:id', (request, response) => {
  const { id, number } = request.body

  if(!number){
    console.log("Please provide your phone number.")
    return response.status(400).json({ error: 'number missing' })
  }
  const update = {
    number: number
  }
  const options = {
    new: true
  }
  Person.findByIdAndUpdate(id, update, options).then(updatedPerson => response.json(updatedPerson))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
