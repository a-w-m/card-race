import React, {useEffect, useRef, useState} from "react"
import styles from "./player.module.css"

const Player = props =>  {

    const {player} = props

    return(
        <div className = {styles.player}>
         {player? player: "Player 1"}
        </div>
    )
}

export default Player;