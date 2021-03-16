import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Nav/Nav.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'


const Container = styled.div`
background-color: #283618;
display: flex;
flex-direction: column;
width: 99vw;
height: 100vh;
justify-content: flex-start;
align-items: center;
    & > h1{
        color: #FEFAE0;
        font-size: 40px;
        text-transform: uppercase;
        margin-top: 50px;
        margin-bottom: 50px
    }
    & > ul{
        background-color: #283618;
        display: flex;
        flex-wrap: wrap;
        width:99vw;
        height: 100vh;

        & > li{
            background-color: #283618;
            display: flex;
            flex-direction: column;
            align-items: center;
            width:50%;
            margin-bottom: 50px;
            & > a{
                color: #DDA15E;
                font-size: 20px;
                text-decoration: none;
                text-transform: uppercase;
                font-weight: 700;
                border-bottom: #FEFAE0 solid 2px;
                margin-bottom: 10px;
            }
        }
    }
    @media(max-width: 768px){
        height: 325vh;
        width: 99vw;
        
        & > ul{
        background-color: #283618;
        display: flex;
        flex-direction: column;
        flex-wrap:nowrap;
        width:99vw;
        height: 100vh;
        & > li{
            padding-left: 20px;
            background-color: #283618;
            display: flex;
            flex-direction: column;
            align-items: center;
            width:80vw;
            margin-bottom: 50px;
            & > a{
                color: #DDA15E;
                font-size: 30px;
                text-decoration: none;
                text-transform: uppercase;
                font-weight: 700;
                border-bottom: #FEFAE0 solid 2px;
                margin-bottom: 10px;
            }
        }
    }
}
`
// const UL = styled.ul`
//         background-color: #283618;
//         display: flex;
//         flex-wrap: wrap;
//         width:99vw;
//         height: 100vh;
// `

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

    const libraries = ['places']
    const mapContainerStyle = {
        width: '35vw',
        height: '35vh'
    }

    
    const options = {
        // styles: mapStyles,
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    if (loadError) return 'Error loading maps!'
    if (!isLoaded) return 'Loading maps!'

    return (
        <Container>
            <h1>most excellent treks</h1>
            <ul>
                {posts.map(item => (
                    <li key={item.id}>
                        <Link to={`post/${item.id}`}>
                            <h2>{item.title}</h2>
                        </Link>
                        {/* <p>{item.content}</p> */}
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={{ lat: +item.latitude, lng: +item.longitude }}
                            options={options}

                        >
                            
                                <Marker
                                    
                                    position={{ lat: +item.latitude, lng: +item.longitude }}
                                />
                            
                        </GoogleMap>
                        <button onClick={() => deletePost(item.id)}>x</button>
                    </li>
                ))}

            </ul>
        </Container>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Posts)