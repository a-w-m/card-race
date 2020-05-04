import React, {useState, useEffect} from "react"
import styles from "./GameWon.module.css"

const GameWon = (props) => {
    return(
        <div>
            <PopOut time = {props.time} setGameWon = {props.setGameWon}/>
            <Overlay/>
        </div>

    )

}
const PopOut = (props) =>{

    function handleClick(){
        props.setGameWon(false)
    }

    return (
        <div className = {styles.popout}>        
        <h1>You Win!</h1>
        <section>Your time was {`${props.endTime}`}</section>
        <section>Enter your name to submit your time to the leaderboard:</section>
        <TimeForm/>
        <Replay/>
        <section className = {styles.close} onClick = {() => handleClick()} >X</section>
        </div>
    )
}


const TimeForm = () =>{
    return (
        <form className = {styles.TimeForm}>
        <label for = "name"></label>
        <input type = 'text' id = "name" default = "name" placeholder ="enter name"/> 
        <button type = 'submit' className = {styles.ButtonSubmitTime}>Submit Time </button>
    </form>
    )
}

const Replay = () =>{
    return (
        <button className = {styles.ButtonPlayAgain}>Play Again</button>
    )
}

const Overlay = ()=>{
    return (
        <div className = {styles.overlay}>
        </div>
    )
}

export default GameWon