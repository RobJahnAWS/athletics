import React from 'react';
import Athlete from './Athlete';

const Athletes = ({athletes}) => {
    return(
        <div className='athletes'>
            {athletes?.map(athlete => {
                return <Athlete athlete={athlete} />
            })}
        </div>)
}

export default Athletes