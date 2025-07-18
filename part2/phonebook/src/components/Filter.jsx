const Filter = ({value, onChange}) => {

    return (
        <>
            <label>filter shown with <input type="search" value={value} onChange={onChange}/></label>
        </>
    )
}

export default Filter