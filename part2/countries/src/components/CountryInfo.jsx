const CountryInfo = ({ filteredCountries }) => {
    return (
        <>
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
        </>
    )
}

export default CountryInfo