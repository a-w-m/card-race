import React from "react"


const Card = (props) => {

   let {style, onClick, children} = props;

   



    return (
        <div
        style = {style}
        onClick = {onClick}>
            {children}
        </div>
    )



}


export default Card;