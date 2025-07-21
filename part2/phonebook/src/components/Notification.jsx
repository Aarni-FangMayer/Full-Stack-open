const Notification = ({message}) => {
    if (message === null) return null
    return (
        <div className="styles" style={{
            padding: '25px',
            margin: '25px 0',
            border: 'solid 3px #226634',
            borderRadius: '10px',
            color: '#226634',
            backgroundColor: '#a7b0a9',
            fontSize: '24px'
        }}>
            {message}
        </div>
    )
}

export default Notification