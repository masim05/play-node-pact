const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

// "In memory" data store
let dataStore = require('./data/dogs.js')

server.get('/dogs', (_, res) => {
  res.json(dataStore)
})

server.get('/dogs/1', (_, res) => {
  res.json(dataStore[0])
})

module.exports = {
  server,
  dataStore,
}
