require('dotenv').config()
const session = require('express-session')
const massive = require('massive')

const express = require('express')
const userCtrl = require('./controllers/user')
const postCtrl = require('./controllers/posts')

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

//AUTH ENDPOINTS!!
app.post('/api/auth/register', userCtrl.register)
app.post('/api/auth/login', userCtrl.login)
app.get('/api/auth/me', userCtrl.getUser)
app.post('/api/auth/logout', userCtrl.logout)
app.post('/api/auth/addPic', userCtrl.addPic) 

//POST ENDPOINTS!!
app.post('/api/post', postCtrl.createPost)


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on ${SERVER_PORT}`)
})