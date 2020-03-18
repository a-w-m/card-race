import React from "react"

const Matches = props =>{
    const {deckSize, matches} = props;

    return(
    <div >Matches: {matches.length } / {deckSize}</div>
    )

}

export default Matches