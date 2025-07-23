import { useState, useEffect } from "react"
import axios from 'axios'

import SearchForm from "./components/SearchForm"
import CountryList from "./components/CountryList"
import CountryInfo from "./components/CountryInfo"

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
          <CountryInfo filteredCountries={filteredCountries} />
        )
        : (
          <CountryList filteredCountries={filteredCountries} />
        )
      }
      
    </>
  )
}

export default App
