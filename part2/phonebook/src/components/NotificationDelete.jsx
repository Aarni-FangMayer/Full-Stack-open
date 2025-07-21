const  NotificationDelete = ({message}) => {
    if(message === null) return null

    return (
        <div className="styles" style={{
            padding: '25px',
            margin: '25px 0',
            border: 'solid 3px #802f24ff',
            borderRadius: '10px',
            color: '#802f24ff',
            backgroundColor: '#ada49fff',
            fontSize: '24px'
        }}>
            {message}
        </div>
    )
}

export default NotificationDelete