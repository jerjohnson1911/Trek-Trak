// const { useState } = require("react");
import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import updateUser from '../../redux/reducer'
// import { login } from '../../../server/controllers/user'

function Auth(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    
function login() {
    const userData = {username, password}
    axios.post('/api/auth/login', userData)
    .then(res => {
        props.history.push('/posts')
        props.updateUser({username: res.data.username, profile_pic: res.data.profile_pic, id: res.data.id})
    })
    .catch(err => {
        console.log(err)
        })
}


return (
    <div>
        <input value={username} 
        onChange={e => setUsername(e.target.value)} 
        type='text' placeholder='username' />

        <input value={password} 
        onChange={e => setPassword(e.target.value)} 
        type='password' placeholder='password' />

        <button onClick={login}>Login</button>
    </div>
)
}

export default connect(null, {updateUser}) (Auth);