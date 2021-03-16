import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Nav.css'
import { updateUser, logout } from '../../redux/reducer'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import hamburger from '../../pics/hamburger.png'

const NavContainer = styled.div`
position: fixed;
right: 10px;
top: 100px;
display: flex;
flex-direction: column;
height: 500px;
justify-content: space-around;
z-index:3;
transition-duration: .25s;
    @media(max-width: 768px) {
        right: -150px;
    }
`
       
    

const NavButton = styled.button`
background-color: #606C38;
        color: #FEFAE0;
        width: 100px;
        height:100px;
        border-radius: 180px;
        border:transparent;
        text-transform:uppercase;
        font-weight:700;
        outline:none;
`

// const HamTog = styled.button`
// display:none;
// height: 25px;
// width: 25px;
//     @media(max-width: 768px){
//         display: initial;
//         position: fixed;
//         top: 70px;
//         right: 20px;
//     }
// `
const Ham = styled.img`
display:none;
height: 50px;
width: 50px;
    @media(max-width: 768px){
        display: initial;
        position: fixed;
        top: 55px;
        right: 35px;
    }
`




function Nav(props) {
const [toggle, setToggle] = useState(false)

    function toggleSwitch(){
        setToggle(!toggle)
    }

    useEffect(() => {
        axios.get('/api/auth/me')
            .then(res => props.updateUser(res.data))

    }, [props])

    //useeffect can have the functionality built in and can utilize useEffect unlimited times.
    // function getUser(){
    //     axios.get('/api/auth/me')
    //     .then(res => props.updateUser(res.data))
    // }


    function logoutUser() {
        axios.post('/api/auth/logout')
            .then(_ => logout)
    }

    // className={`${toggle ? 'show' : ''}`}

    return (
        props.location.pathname !== '/' &&
        <NavContainer id={`${toggle ? 'show' : ''}`}>
            <Ham onClick={toggleSwitch} src={hamburger}  />
                        
            <Link to='/posts'>
                <NavButton>Posts</NavButton>
            </Link>
            <Link to='/new'>
                <NavButton>New Post</NavButton>
            </Link>

            <Link to='/map'>
                <NavButton>Map</NavButton>
            </Link>

            <Link to='/' onClick={logoutUser}>
                <NavButton>Logout</NavButton>
            </Link>

        </NavContainer>
    )
}

const mapStateToProps = (state) => state


export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav))
// export default Nav