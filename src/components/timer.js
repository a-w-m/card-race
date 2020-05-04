import React, {useState, useEffect} from "react"




const Timer = (props) => {

const {startTime, timer, setTimer, isGameWon} = props

    useEffect(()=>{
       let id;

       if (startTime){ 
        id = setInterval(()=>{
        const currentTime = Date.now()
        setTimer(()=>{
            return Math.floor((currentTime - startTime)/1000)
        })


        }, 100)
    } 

        return () =>{
            clearInterval(id)
            setTimer(0)
        }


}, [startTime, isGameWon]

    )
    
    return(
        <div>{timer} seconds</div>
    )
}

export default Timer;