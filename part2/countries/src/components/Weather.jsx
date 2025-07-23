import axios from 'axios'
import { useEffect, useState } from 'react'

const Weather = ({ selectedCountry }) => {

    const [coordinates, setCoordinates] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})

    const weatherIcons = { 0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️", 71: "❄️", 73: "❄️", 75: "❄️", 80: "🌧️", 81: "🌧️", 82: "🌧️", 95: "⛈️", 96: "⛈️", 99: "⛈️" }
    
    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${selectedCountry.name.common}`)
            .then(response => {
                const data = response.data[0]
                const latlng = data.capitalInfo.latlng
                if(latlng) {setCoordinates(latlng)}
            })
    }, [selectedCountry])
    useEffect(()=> {
        if (coordinates.length === 2) {
            axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current_weather=true`)
            .then(response => {
                const temperature = response.data.current_weather.temperature
                const wind = response.data.current_weather.windspeed
                const weatherCode = response.data.current_weather.weathercode
                setCurrentWeather({temperature, wind, weatherCode})
            })
        }
    },[coordinates])
    return (
        <>
            <h3>Weather in {selectedCountry.capital}</h3>
            <p>Temperature {currentWeather.temperature} Celcius {weatherIcons[currentWeather.weatherCode]}</p>
            <p>Wind {currentWeather.wind} m/s</p>
        </>
    )
}

export default Weather