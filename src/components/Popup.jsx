import React from 'react'

export default function Popup({content, handleClose}) {
    return (
        <div className="popup-box" onClick={handleClose}>
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>
                {content}
            </div>
        </div>
    )
}
