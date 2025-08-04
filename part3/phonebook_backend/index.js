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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(personsCount => {
      const currentTime = new Date()
      response.send(`<p>Phonebook has info for ${personsCount} people</p><p>${currentTime}</p>`)
    })
    .catch(next)
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(next)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
    if(person) response.json(person)
      else response.status(404).end()
    })
    .catch(next)
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(next)
})

app.post('/api/persons/', (request, response, next) => {
  const {name, number} = request.body
  const person = new Person({name, number})

  if(!person.name || !person.number){
    console.log("Please provide your name and phone number.")
    return response.status(400).json({ error: 'name or number missing' })
  }

  Person.findOne({ name })
    .then(existsPerson => {
      if(existsPerson){
      console.log("This name is already registered.")
      return response.status(400).json({ error: 'Name must be uniqe' })
    }
    person.save().then(newPerson => response.json(newPerson))
    })
    .catch(next)
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  const id = request.params.id

  if(!number){
    console.log("Please provide your phone number.")
    return response.status(400).json({ error: 'number missing' })
  }
  const update = {
    number: number
  }
  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }
  Person.findByIdAndUpdate(id, update, options)
    .then(updatedPerson => response.json(updatedPerson))
    .catch(next)
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
