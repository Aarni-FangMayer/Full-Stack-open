const Persons = ({filtered}) => {
    return (
        <>
            {filtered.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons