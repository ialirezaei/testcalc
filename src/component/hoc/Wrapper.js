import React from 'react'
import '../../scss/Wrapper.scss'
const Wrapper = ({ children }) => {
    return (
        <div className="bg-opacity-75 bg-warning wrapper">
            {children}
        </div>
    )
}

export default Wrapper