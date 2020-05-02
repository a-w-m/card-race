import React, {useState, useEffect} from "react"
import styles from "./GameWon.module.css"

const GameWon = (props) => {
    return(
        <div>
            <PopOut time = {'1:00'}/>
            <Overlay/>
        </div>

    )

}
const PopOut = (props) =>{
    return (
        <div className = {styles.popout}>        
        <p>You Win!</p>
        <p>Your time was {props.time}</p>
        <TimeForm/>
        <Replay/>
        </div>
    )
}


const TimeForm = () =>{
    return (
        <form className = {styles.form}>
        <label for = "name"></label>
        <input type = 'text' id = "name" default = "name"/> 
        <button type = 'submit'>Submit Time </button>
    </form>
    )
}

const Replay = () =>{
    return (
        <button>Play Again</button>
    )
}

const Overlay = ()=>{
    return (
        <div className = {styles.overlay}>
        </div>
    )
}

export default GameWon