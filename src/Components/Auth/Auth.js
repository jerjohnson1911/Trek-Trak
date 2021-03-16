import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/reducer'
// import {css} from '@emotion/react'
import styled from '@emotion/styled'

const Container = styled.div`
background-color: #283618;
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
`
const InputContainer = styled.div`
display: flex;
flex-direction: row;
width: 650px;
justify-content: space-between;

    @media(max-width: 768px) {
        flex-direction: column;
        align-items:center;
    }
`

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
width: 650px;
justify-content: space-between;
    &  > button{
        background-color: transparent;
        width:200px;
        height:30px;
        border: transparent;
        color: #FEFAE0;
        /* box-shadow: 0px 0px 15px 5px rgba(254,250,224,0.39); */
        box-shadow: 0px 0px 0px 3px rgba(254,250,224,0.28);
        text-transform: uppercase;
        transition-duration: .25s;
      }  
    & > button:hover{
        transform: translate(0, -4px);
        box-shadow: 0px 0px 0px 3px rgba(254,250,224,1);
    }
    @media(max-width:768px){
        justify-content: space-around;
        width:450px;
        & > button {
            background-color: #606C38;
            width: 100px;
            height:100px;
            border-radius: 180px;
            border:transparent;
        }
    }
    
`

const Header = styled.h1`
font-size: 50px;
font-weight: 700;
color: #FEFAE0;
margin-bottom: 200px;
margin-top: 100px;
`

const Input = styled.input`
border: 0;
border-bottom: 2px solid gray;
outline: 0;
font-size: 1.3rem;
color: #FEFAE0;
padding: 7px 0;
background: transparent;
margin-bottom: 20px;
width: 300px;
transition-duration: .25s;
    & > ::placeholder{
    color: #283618;
}
    @media(max-width: 768px){
        margin-bottom:50px;
    }
`


function Auth(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function register() {
        const userData = { username, password }
        axios.post('/api/auth/register', userData)
            .then(res => {
                props.history.push('/posts')
                props.updateUser({ username: res.data.username, profile_pic: res.data.profile_pic, id: res.data.id })
            }).catch(err => {
                setError('Username is taken!')
                console.log(err)
            })

    }

    function login() {
        const userData = { username, password }
        axios.post('/api/auth/login', userData)
            .then(res => {
                props.history.push('/posts')
                props.updateUser({ username: res.data.username, profile_pic: res.data.profile_pic, id: res.data.id })
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
        <Container>
            <Header>TREK-TRAK</Header>

            {error && <h3>{error} <span onClick={closeErrorMessage}>X</span></h3>}

            <InputContainer>
                <Input value={username}
                    onChange={e => setUsername(e.target.value)}
                    type='text' placeholder='username' />

                <Input value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='password' placeholder='password' />
            </InputContainer>

            <ButtonContainer>
                <button onClick={login}>Login</button>
                <button onClick={register}>Register</button>
            </ButtonContainer>

        </Container>
    )
}

export default connect(null, { updateUser })(Auth);