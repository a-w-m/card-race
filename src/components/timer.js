import React, {useState, useEffect} from "react"


let id;

const Timer = (props) => {

const {startTime, timer, setTimer, isGameWon} = props

    useEffect(()=>{

       if (startTime && (timer=== 0)){ 
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


}, [startTime, isGameWon]

    )
    
    return(
        <div>{timer} seconds</div>
    )
}

export default Timer;