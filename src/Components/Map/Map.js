import React, {useEffect, useState} from 'react'
// import axios from 'axois'
import { 
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'

const libraries = ['places']
const mapContainerStyle = {
    width: '99vw',
    height: '95vh'
}
const center = {
    lat: 40.29710871767122,
    lng:-111.69489911355494
}


function Map() {
const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
})

if (loadError) return 'Error loading maps!'
if (!isLoaded) return 'Loading maps!'

return(
    <div>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8} 
        center={center}></GoogleMap>
    </div>
)

}


export default Map