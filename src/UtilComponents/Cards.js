import React from 'react';
import './Cards.css';

export const ResumeCard = (props) => {
   
    return(
        <div className='resumeCard'>
            <h2>{ props.title } at { props.company }</h2>
            <p>{props.responsabilities}</p>
        </div>
    );
};

