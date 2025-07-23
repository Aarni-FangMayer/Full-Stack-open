import { useState } from "react"
import CountryInfo from "./CountryInfo"

const CountryList = ({ filteredCountries }) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    const handleShow = (country) => {
        console.log('Show button clicked', country.name.common)
        setSelectedCountry(country)
    }

    return (
        <>
            {selectedCountry === null 
                ? (<ul> 
                        {filteredCountries.map(country => (
                            <li key={country.cca3} style={{marginBottom: '10px'}}>
                                {country.name.common}
                                <button style={{marginLeft: '15px'}} onClick={() => handleShow(country)}>Show</button>
                            </li>
                        ))}
                    </ul>)
                : (<CountryInfo filteredCountries={selectedCountry} />)
            }
        </>  
    )
}

export default CountryList