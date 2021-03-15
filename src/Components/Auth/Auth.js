import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {updateUser} from '../../redux/reducer'


function Auth(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

function register(){
    const userData = {username, password}
    axios.post('/api/auth/register', userData)
    .then(res => {
        props.history.push('/posts')
        props.updateUser({username: res.data.username, profile_pic: res.data.profile_pic, id: res.data.id})
    }).catch(err => {
        setError('Username is taken!')
        console.log(err)
    })

}
    
function login() {
    const userData = {username, password}
    axios.post('/api/auth/login', userData)
    .then(res => {
        props.history.push('/posts')
        props.updateUser({username: res.data.username, profile_pic: res.data.profile_pic, id: res.data.id})
    })
    .catch(err => {
        setError('Wrong Username or Password!')
        console.log(err)
        })
}

function closeErrorMessage() {
    setError(!error)
    setUsername('')
    setPassword('')
}


return (
    <div>
          {error && <h3>{error} <span onClick={closeErrorMessage}>X</span></h3>}


        <input value={username} 
        onChange={e => setUsername(e.target.value)} 
        type='text' placeholder='username' />

        <input value={password} 
        onChange={e => setPassword(e.target.value)} 
        type='password' placeholder='password' />

        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
        
    </div>
)
}

export default connect(null, {updateUser}) (Auth);