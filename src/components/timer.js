import React, {useEffect} from "react"
import styles from "./timer.module.css"


let id;

const Timer = (props) => {

const {startTime, timer, setTimer, isGameWon} = props

    useEffect(()=>{

       if (startTime && !(isGameWon)){ 
        id = setInterval(()=>{
        const currentTime = Date.now()
        setTimer(()=>{
            return Math.floor((currentTime - startTime)/1000)
        })


        }, 100)
    }
        return () =>{
            clearInterval(id)
        }


}, [startTime, isGameWon, setTimer]

    )
    
    return(
        <div className = {styles.timer}>Time: {timer}</div>
    )
}

export default Timer;