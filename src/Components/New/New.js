import React, { useState } from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
// import {updateUser} from '../../redux/reducer'
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

function New(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [img, setImg] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [coor, setCoor] = useState({})
    const [center, setCenter] = useState({lat: 40.2969, lng: -111.6946})
    

    
    function submit() {
        const postData = { title, content, img, lat, lng }
        axios.post('/api/post', postData)
            .then(() => {
                console.log(props)
                props.history.push('/posts')

            })
            .catch((err) => console.log(err))
    }

    // let center = {
    //     lat: 40.2969,
    //     lng: -111.6946
    // }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    

    if (loadError) return 'Error loading maps!'
    if (!isLoaded) return 'Loading maps!'

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


            <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={center}
                    options={options}
                    onClick={e => {
                        // {console.log(e)}
                      setCoor({
                          lat: e.latLng.lat(),
                          lng: e.latLng.lng()
                      })
                      setLat(`${e.latLng.lat()}`)
                      setLng(`${e.latLng.lng()}`)
                      setCenter({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    })
                      
                    }}
                    
                >

                    <Marker
                        position={{ lat: coor.lat, lng: coor.lng }}
                    />

                </GoogleMap>

        </div>

    )
}

export default New