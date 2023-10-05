import React from 'react'

const Athlete = ({athlete}) => {
    return (
        <div className="athlete">
            <img className="athlete-picture" src={athlete.picture} />
            <h1 className="athlete-name">{athlete.name}</h1>
            <p className="athlete-about">{athlete.about}</p>
        </div>
    )
}
export default Athlete;