import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


function Posts() {
    const [posts, setPosts] = useState([])



    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await axios.get('/api/posts')
        setPosts(res.data)
    }

    function deletePost(id) {
        axios.delete(`/api/post/${id}`)
            .then(fetchData())
    }

    return (
        <div>
            <h1>Here are your posts!</h1>
            <ul>
                {posts.map(item => (
                    <li key={item.id}>
                        <Link to={`post/${item.id}`}>
                            <p>{item.title}</p>
                        </Link>
                        <p>{item.content}</p>
                        <button onClick={() => deletePost(item.id)}>x</button>
                    </li>
                ))}

            </ul>
        </div>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Posts)