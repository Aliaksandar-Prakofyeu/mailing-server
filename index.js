const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const http = require('http').Server(app)
const sequelize = require('./db')
const {Action} = require('./actions/Action')
const {startWsServer} = require('./websocket/websocket')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

;(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Database connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})()

Action.Init()

startWsServer(app)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})