import React, { useState } from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
// import {updateUser} from '../../redux/reducer'

function New(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [img, setImg] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    


    function submit() {
        const postData = { title, content, img, lat, lng }
        axios.post('/api/post', postData)
            .then(() => {
                console.log(props)
                props.history.push('/posts')

            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <input value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Title' type='text' />

            <input value={content}
                onChange={e => setContent(e.target.value)}
                placeholder='Content' type='text' />

            <input value={img}
                onChange={e => setImg(e.target.value)}
                placeholder='Img' type='text' />
            
            <input value={lat}
                onChange={e => setLat(e.target.value)}
                placeholder='Enter Latitude' type='number' />
            
            <input value={lng}
                onChange={e => setLng(e.target.value)}
                placeholder='Enter Longitude' type='number' />



            <button onClick={submit}>Submit</button>
        </div>

    )
}

export default New