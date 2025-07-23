const CountryList = ({ filteredCountries }) => {
    return (
        <ul>
            {filteredCountries.map(country => (<li key={country.cca3}>{country.name.common}</li>))}
        </ul>
    )
}

export default CountryList