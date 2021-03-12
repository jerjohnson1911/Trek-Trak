import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { 
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'

// import mapStyles from '../../mapStyles'

const libraries = ['places']
const mapContainerStyle = {
    width: '99vw',
    height: '95vh'
}
const center = {
    lat: 40.29710871767122,
    lng:-111.69489911355494
}

const options = {
    // styles: mapStyles,
}

function Map() {
const [markers, setMarkers] = useState([])

console.log(markers)

useEffect(() => {
    fetchMarkers()
}, [])

const fetchMarkers = async () => {
    const res = await axios.get('/api/allCoordinates')
    setMarkers(res.data)
}

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
        center={center}
        options={options}

        >
            {markers.map((marker) => (
            <Marker 
            key={marker.id}
            position={{lat: marker.latitude, lng: marker.longitude}} 
            />
            ))}
        </GoogleMap>
        
    </div>
)

}


export default Map