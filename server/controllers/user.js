const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        const result = await db.user.find_user([username])
        const existingUser = result[0]
        if (existingUser) {
            return res.status(409).send('Username is taken!')
        }
        const salt = bcrypt.genSalt(10)
        const hash = bcrypt.hashSync(password, salt)
        const registeredUser = await db.user.create_user([username, hash])
        const user = registeredUser[0]
        req.session.user = {username: user.username, profile_pic: user.profile_pic, id: user.id}
        return req.status(201).send(req.session.user)
    }
}