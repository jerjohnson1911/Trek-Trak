import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function Post() {
    // console.log('hit')
    const [post, setPost] = useState([])
    const {id} = useParams()

    
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        // console.log(props)
        const res = await axios.get(`/api/post/${id}`)
        setPost(res.data)
        
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    )

}

export default Post