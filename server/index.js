require('dotenv').config()
const session = require('express-session')
const massive = require('massive')

const express = require('express')

let {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 5}
    })
)


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on ${SERVER_PORT}`)
})