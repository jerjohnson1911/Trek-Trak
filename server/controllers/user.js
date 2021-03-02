const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {username, password, first_name, last_name} = req.body
        const db = req.app.get('db')
        const result = await db.user.find_user([username])
        const existingUser = result[0]
        if (existingUser) {
            return res.status(409).send('Username is taken!')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const registeredUser = await db.user.create_user([username, hash, first_name, last_name])
        const user = registeredUser[0]
        req.session.user = {username: user.username, profile_pic: user.profile_pic, id: user.id}
        return res.status(201).send(req.session.user)
    },

    login: async (req, res) => {
        const {username, password} = req.body
        const foundUser = await req.app.get('db').user.find_user([username])
        const user = foundUser[0]
        if(!user){
            return res.status(401).send('Unable to log in, check username and password!')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated) {
            return res.status(403).send('Unable to log in, check username and password!')
        }
        req.session.user = {username: user.username, profile_pic: user.profile_pic, id: user.id}
        return res.status(201).send(req.session.user)
    },

    getUser: (req, res) => {
        if(req.session.user){
            return res.status(200).send(req.session.user)
        }else {
            res.status(404).send('Session not found!')
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    }
}