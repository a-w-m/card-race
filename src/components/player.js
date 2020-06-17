import React, {useEffect, useRef, useState} from "react"
import styles from "./player.module.css"

const Player = props =>  {

    const {player} = props

    return(
        <div className = {player === 'Player 1' ? styles.playerOne : styles.playerTwo}>
         {player}
        </div>
    )
}

export default Player;