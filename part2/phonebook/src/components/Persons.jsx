const Persons = ({filtered, onDelete}) => {

    return (
        <>
            {filtered.map(person => 
                <div key={person.id}>
                    <p style={{ display: 'inline-block', marginRight: '15px' }}>{person.name} {person.number}</p>
                    <button style={{ display: 'inline-block' }} onClick={() => onDelete(person.id, person.name)} >delete</button>
                </div>
            )}
        </>
    )
}

export default Persons