import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'

const libraries = ['places']
const mapContainerStyle = {
    width: '50vw',
    height: '50vh'
}
const options = {
    // styles: mapStyles,
}


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
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>
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

            </div>
        </div>
    )

}

export default Post