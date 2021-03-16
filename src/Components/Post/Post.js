import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'

const libraries = ['places']
const mapContainerStyle = {
    width: '50vw',
    height: '85vh'
}
const options = {
    // styles: mapStyles,
}


const Container = styled.div`
height: 100vh;
width: 90vw;
display: flex;
flex-direction: row;
justify-content: space-evenly;
padding-top: 30px;

    /* @media(max-width: 768px){
        flex-direction: column;
        justify-content: center;
    } */
`
const InfoDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
    & > h2{
        font-size:40px;
        color: #FEFAE0;
    }
    &  > p{
        color: #FEFAE0;
        margin-top: 50px;
    }
    @media(max-width: 768px){
        width:300px;
        position: absolute;
        top: 200px;
        right:30px;
    }
`

const MapDiv = styled.div`
@media(max-width: 768px){
    position:absolute;
    left:0;
}
`

function Post() {
    // console.log('hit')
    const [post, setPost] = useState([])
    const { id } = useParams()
    const center = {
        lat: +post.latitude,
        lng: +post.longitude
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        // console.log(props)
        const res = await axios.get(`/api/post/${id}`)
        setPost(res.data)

    }

    const [markers, setMarkers] = useState([])

    console.log(markers)

    useEffect(() => {
        fetchMarkers()
    }, [])

    const fetchMarkers = async () => {
        const res = await axios.get('/api/allCoordinates')
        setMarkers(res.data)
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    if (loadError) return 'Error loading maps!'
    if (!isLoaded) return 'Loading maps!'

    return (
        <Container>
            <MapDiv>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={center}
                    options={options}

                >

                    <Marker
                        position={{ lat: +post.latitude, lng: +post.longitude }}
                    />

                </GoogleMap>

            </MapDiv>
            <InfoDiv>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>Latitude:{post.latitude}  / Longitude:{post.longitude}</p>
            </InfoDiv>
        </Container>
    )

}

export default Post