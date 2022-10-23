import React from 'react'
import '../../scss/ButtonBox.scss'

const ButtonBox = ({ children }) => {
    return (
        <div className="buttonBox">
            {children}
        </div>
    )
}

export default ButtonBox