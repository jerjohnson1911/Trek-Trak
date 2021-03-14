import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'

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
        width: '25vw',
        height: '25vh'
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
        <div>
            <h1>Here are your posts!</h1>
            <ul>
                {posts.map(item => (
                    <li key={item.id}>
                        <Link to={`post/${item.id}`}>
                            <p>{item.title}</p>
                        </Link>
                        <p>{item.content}</p>
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
        </div>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Posts)