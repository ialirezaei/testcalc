import React from 'react'
import '../../scss/screen.scss'
const Screen = ({ value, }) => {
    return (
        <div className="bg-opacity-10 mx-auto mb-4 mt-2 bg-primary justify-content-end screen shadow-sm">{value}</div>
    )
}

export default Screen