import React from 'react'

export default function RatingStars(props){
    const stars = props.stars
    const disabledStars = 5 - stars
    let a = ''
    let b = ''

    for(let i=0; i<stars; i++){
        a += "★"
    }
    for(let i=0; i<disabledStars; i++){
        b += "★"
    }
    return(
        <>
            {a}<span style={{color: "#c0c0c0"}}>{b}</span>
        </>
    )
}