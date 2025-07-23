const CountryInfo = ({ filteredCountries }) => {
    return (
        <>
            <h2>{filteredCountries.name.common}</h2>
            <p>Capital: {filteredCountries.capital}</p>
            <p>Area: {filteredCountries.area} km²</p>
            <br />
            <h3>Languages</h3>
            <ul>
                {Object.values(filteredCountries.languages).map(lang => 
                <li key={lang}>{lang}</li>
                )}
            </ul>
            <br />
            <img src={filteredCountries.flags.png} alt="country flag" style={{border: 'solid 2px black'}}/>
        </>
    )
}

export default CountryInfo