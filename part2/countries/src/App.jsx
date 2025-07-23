import { useState, useEffect } from "react"
import axios from 'axios'

import SearchForm from "./components/SearchForm"

function App() {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    if(value !==null){
      console.log('effect starts with not null value: ', value)

      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('Response from server array of all countries:', response.data)
          setAllCountries(response.data)
        })
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const filteredCountries = allCountries.filter(country => 
    country.name.common.toLowerCase().includes(value.toLocaleLowerCase())
  )
  return (
    <>
      <SearchForm value={value} handleChange={handleChange} />
      {filteredCountries.length > 10 
        ? (<p>Too many matches, specify another filter</p>) 
        : filteredCountries.length === 1 ? (
          <div className="countryInfo">
            <h2>{filteredCountries[0].name.common}</h2>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Area: {filteredCountries[0].area} km²</p>
            <br />
            <h3>Languages</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map(lang => 
                <li key={lang}>{lang}</li>
              )}
            </ul>
            <br />
            <img src={filteredCountries[0].flags.png} alt="country flag" style={{border: 'solid 2px black'}}/>
          </div>
        )
        : (
          <ul>
              {filteredCountries.map(country => (<li key={country.cca3}>{country.name.common}</li>))}
          </ul>
        )
      }
      
    </>
  )
}

export default App
