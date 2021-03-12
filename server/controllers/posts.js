module.exports = {
    readPosts: async (req, res) => {
        let {id} = req.session.user
        const db = await req.app.get('db')
        db.posts.read_my_posts([id])
        .then(posts => res.status(200).send(posts))
        
    },

    readPost: (req, res) => {
        // console.log('hit readPost')
        req.app.get('db').posts.read_one_post(req.params.id)
        .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))

    },

    createPost: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user
        const { title, img, content, lat, lng } = req.body
        const date = new Date()
        if (id) {
            await db.posts.create_post([title, content, img, id, date, +lat, +lng])
            res.status(200).send('Post created!')
        }
    },

    deletePost: (req, res) => {
        req.app.get('db').posts.delete_post(req.params.id)
          .then(_ => res.sendStatus(200))
      },
    
    readAllCoordinates: async (req, res) => {
        let {id} = req.session.user
        const db = await req.app.get('db')
        db.posts.read_all_lat_lng([id])
        .then(posts => res.status(200).send(posts))
    }
}