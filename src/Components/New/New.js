import React, { useCallback, useState } from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
// import {updateUser} from '../../redux/reducer'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox'

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
    const [center, setCenter] = useState({ lat: 40.2969, lng: -111.6946 })

    const onMapClick = useCallback(e => {
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

    }, [])

    const mapRef = React.useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(14)
    }, [])

    if (loadError) return 'Error loading maps!'
    if (!isLoaded) return 'Loading maps!'

    function submit() {
        const postData = { title, content, img, lat, lng }
        axios.post('/api/post', postData)
            .then(() => {
                console.log(props)
                props.history.push('/posts')

            })
            .catch((err) => console.log(err))
    }

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

            <Search panTo={panTo} />
            <Locate panTo={panTo} />

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}

            >

                <Marker
                    position={{ lat: +coor.lat, lng: +coor.lng }}
                />

            </GoogleMap>

        </div>

    )
}

function Locate({ panTo }) {
    return (
        <button onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude

                })
            }, _ => null)
        }}
        >
            Locate
        </button>
    )
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 40.29710871767122, lng: () => -111.69489911355494 },
            radius: 200 * 1000

        }
    })

    return <Combobox
        onSelect={async (address) => {
            setValue(address, false)
            clearSuggestions()
            try {
                const results = await getGeocode({ address })
                const { lat, lng } = await getLatLng(results[0])
                panTo({ lat, lng })
            } catch (error) {
                console.log('error!')
            }
        }}
    >
        <ComboboxInput
            value={value}
            onChange={e => {
                setValue(e.target.value)
            }}
            disabled={!ready}
            placeholder='Enter an address'
        />
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" && data.map(({ id, description }) => (<ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
}

export default New