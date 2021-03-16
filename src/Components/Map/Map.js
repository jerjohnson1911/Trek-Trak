import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng
// } from 'use-places-autocomplete'
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption
// } from '@reach/combobox'

// import mapStyles from '../../mapStyles'

const libraries = ['places']
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}
const center = {
    lat: 40.29710871767122,
    lng: -111.69489911355494
}

const options = {
    // styles: mapStyles,
}

function Map() {
    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null)

    console.log(markers)

    useEffect(() => {
        fetchMarkers()
    }, [])

    const fetchMarkers = async () => {
        const res = await axios.get('/api/allCoordinates')
        setMarkers(res.data)
    }

    // const mapRef = React.useRef()
    // const onMapLoad = useCallback((map) => {
    //     mapRef.current = map
    // }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    // const panTo = useCallback(({ lat, lng }) => {
    //     mapRef.current.panTo({ lat, lng })
    //     mapRef.current.setZoom(14)
    // }, [])    

    if (loadError) return 'Error loading maps!'
    if (!isLoaded) return 'Loading maps!'


    return (
        <div>

            {/* <Search panTo={panTo} /> */}

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                // onLoad={onMapLoad}

            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: +marker.latitude, lng: +marker.longitude }}
                        onClick={() => {
                            setSelected(marker)
                        }}
                    />
                ))}

                {selected ? (<InfoWindow
                    position={{ lat: +selected.latitude, lng: +selected.longitude }}
                    onCloseClick={_ => {
                        setSelected(null)
                    }}
                >
                    <div>
                        <h3>
                            <Link to={`post/${selected.id}`}>
                                {selected.title}
                            </Link>
                        </h3>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>

        </div>
    )

}

// function Search({panTo}) {
//     const { 
//         ready, 
//         value, 
//         suggestions: { status, data }, 
//         setValue, 
//         clearSuggestions 
//     } = usePlacesAutocomplete({
//         requestOptions: {
//             location: { lat: () => 40.29710871767122, lng: () => -111.69489911355494 },
//             radius: 200 * 1000

//         }
//     })

//     return <Combobox
//         onSelect={async (address) => {
//             setValue(address, false)
//             clearSuggestions()
//             try {
//                 const results = await getGeocode({ address })
//                 const { lat, lng } = await getLatLng(results[0])
//                 panTo({ lat, lng })
//             } catch (error) {
//                 console.log('error!')
//             }
//         }}
//     >
//         <ComboboxInput
//             value={value}
//             onChange={e => {
//                 setValue(e.target.value)
//             }}
//             disabled={!ready}
//             placeholder='Enter an address'
//         />
//         <ComboboxPopover>
//             <ComboboxList>
//                 {status === "OK" && data.map(({ id, description }) => (<ComboboxOption key={id} value={description} />
//                 ))}
//             </ComboboxList>
//         </ComboboxPopover>
//     </Combobox>
// }


export default Map