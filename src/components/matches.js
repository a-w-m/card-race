import React from "react"
import styles from "./matches.module.css"

const Matches = props =>{
    const {deckSize, matches} = props;

    return(
    <div className ={styles.matches}>Matches: {matches.length } / {deckSize}</div>
    )

}

export default Matches