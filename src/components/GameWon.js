import React, {useState, useEffect} from "react"
import styles from "./GameWon.module.css"

const GameWon = (props) => {
    return(
        <div>
            <PopOut endTime = {props.endTime} setGameWon = {props.setGameWon} setReset = {props.setReset}/>
            <Overlay/>
        </div>

    )

}
const PopOut = (props) =>{

    function handleClick(){
        props.setGameWon(false)
        props.setReset(true)
    }

    return (
        <div className = {styles.popout}>        
        <h1>You Win!</h1>
        <section>Your time was {`${props.endTime}`} seconds</section>
        <section>Enter your name to submit your time to the leaderboard:</section>
        <TimeForm/>
        <Replay handleClick = {handleClick}/>
        <section className = {styles.close} onClick = {() => handleClick()} >X</section>
        </div>
    )
}


const TimeForm = () =>{

    const [input, setInput] = useState()

    function handleSubmit(){

    }

    return (
        <form className = {styles.TimeForm}>
        <label for = "name"></label>
        <input type = 'text' id = "name" default = "name" placeholder ="enter name" value = {input} onChange ={(event)=>{setInput(event.target.value)}}/> 
        <button type = 'submit' className = {styles.ButtonSubmitTime}>Submit Time </button>
    </form>
    )
}

const Replay = (props) =>{

    return (
        <button className = {styles.ButtonPlayAgain} onClick = {()=> props.handleClick()}>Play Again</button>
    )
}

const Overlay = ()=>{
    return (
        <div className = {styles.overlay}>
        </div>
    )
}

export default GameWon