const mongoose = require('mongoose')
const env = require('dotenv').config()

const password = process.env.MONGO_DB
const url = `mongodb+srv://fullstack:${password}@fullstack-hy-3.cyadzxm.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3]) {
const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})

person.save().then(result => {
    console.log('added', result.name, result.number)
    mongoose.connection.close()
})

} else {
    Person.find({}).then(result => {
        console.log('Phonebook')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}