import React from 'react'

const ErrorMessage = ({message, setErrorMessage}) => {
    if(message===null){
        return null
    }

    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)

    return (
        <div className="error">
            {message}            
        </div>
    )
}

export default ErrorMessage
