module.exports = {


    createPost: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user
        const { title, img, content } = req.body
        const date = new Date()
        if (id) {
            await db.posts.create_post([title, content, img, id, date])
            res.status(200).send('Post created!')
        }
    }
}