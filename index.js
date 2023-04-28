const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-34-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

const personCount = persons.length

const generateId = () => {
    const newId = Math.random().toString().slice(2, 15)
    return newId
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => {
        return person.id === id
    })
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const foundPerson = persons.find(p => p.name === body.name)

    if (!body.name) {
        return res.status(400).json({error: 'name missing'})
    } if (!body.number) {
        return res.status(400).json({error: 'number missing'})
    } if (!!foundPerson) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number || null,
    }

    persons = persons.concat(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    const date = new Date().toString()
    res.send(
        `<p>Phonebook has info for ${personCount} people</p>
        <p>${date}</p>`
    )
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})