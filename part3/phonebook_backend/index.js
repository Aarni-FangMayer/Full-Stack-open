const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const personsCount = persons.length
    const currentTime = new Date()

    response.send(`<p>Phonebook has info for ${personsCount} people</p><p>${currentTime}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const createId = () => {
    return Math.floor(Math.random() * 999)
}

app.post('/api/persons/', (request, response) => {
    const person = request.body
    person.id = createId()

    if(!person.name || !person.number) {
        console.log("Please provide your name and phone number.")
        return response.status(400).json({ error: 'name or number missing' })
    }

    const existsPerson = persons.find(p => p.name === person.name)
    if(existsPerson){
        console.log("This name is already registered.")
        return response.status(400).json({ error: 'Name must be uniqe' })
    }
    
    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
