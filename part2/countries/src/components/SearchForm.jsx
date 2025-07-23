const SearchForm = ({value, handleChange}) => {
    return (
        <>
            <label>Find cointries: 
                <input 
                    type="search" 
                    placeholder="type here to find..."
                    value={value}
                    onChange={handleChange}
                />
            </label>
        </>
    )
}

export default SearchForm