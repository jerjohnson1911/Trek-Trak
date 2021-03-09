import React, { useState } from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
// import {updateUser} from '../../redux/reducer'

function New(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [img, setImg] = useState('')


    function submit() {
        const postData = { title, content, img }
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

            <button onClick={submit}>Submit</button>
        </div>

    )
}

export default New