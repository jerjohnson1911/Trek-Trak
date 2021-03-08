import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'


function Posts() {
const [posts, setPosts] = useState([])


useEffect( async () => {
    const res = await axios.get('/api/posts')
    setPosts(res.data)
}, [])

    


    return (
        <div>
            <h1>Test 1 2</h1>
            <ul>
            {posts.map(item => (
                <li key={item.id}>
                    <p>{item.title}</p> 
                    <p>{item.content}</p>
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