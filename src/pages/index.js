import React, { useState, useEffect, Fragment } from "react"

// import { Link } from "gatsby"

import Deck from "../components/deck"
import Matches from "../components/matches"
import Reset from "../components/reset"
import GameWon from "../components/GameWon"
import Timer from "../components/timer"
import Scores from "../components/scores"
import Player from "../components/player"
import Multiplayer from "../components/multiplayer"

//import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"


//initialize socket connection

const io = require('socket.io-client')

let socket;

if (process.env.NODE_ENV !== 'production'){
  socket = io("10.0.0.20:3000")
}
else{
  socket = io()
}

//socket connect message

socket.on('connect', ()=>{
  socket.send(`${socket.id} connected`)
})




const App = () => {
  const [matches, setMatches] = useState([])
  const [deckSize, setDeckSize] = useState()
  const [reset, setReset] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [timer, setTimer] = useState(0)
  const [isGameWon, setGameWon] = useState(false)
  const [isMultiplayer, setIsMultiplayer] = useState(false)
  const [player, setPlayer] = useState({ name: "" })
  const [multiplayerMatches, setMultiplayerMatches] = useState([])


  useEffect(() => {
    if (matches.length === deckSize) {
      setGameWon(true)
    }
  }, [matches, deckSize])

  useEffect(() => {
    if (reset) {
      setStartTime(null)
      setTimer(0)
      setGameWon(false)
    }
  }, [reset])



  return (
    <div className="gridLayout">
      <Deck
        matches={Matches}
        setMatches={setMatches}
        setDeckSize={setDeckSize}
        reset={reset}
        setReset={setReset}
        startTime={startTime}
        setStartTime={setStartTime}
        isMultiplayer ={isMultiplayer}
      />
      
        {(!isMultiplayer && startTime)  &&<Timer
          timer={timer}
          setTimer={setTimer}
          startTime={startTime}
          isGameWon={isGameWon}
        ></Timer>}
     {!isMultiplayer && <Reset setReset={setReset} />  }
      {!isMultiplayer &&<Scores></Scores>}
      {(isGameWon && !isMultiplayer)  && (
        <GameWon setGameWon={setGameWon} endTime={timer} setReset={setReset}  isGameWon = {isGameWon}/>
      )}
      <Matches id = '1' player = {player} isMultiplayer = {false} matches = {player.name === "Player 1" || player.name === "" ? matches: multiplayerMatches} deckSize ={deckSize}  reset = {reset} setReset = {setReset}/>
      <Multiplayer socket = {socket}  deckSize = {deckSize} isMultiplayer = {isMultiplayer}  setIsMultiplayer ={setIsMultiplayer} player ={player} setPlayer = {setPlayer} matches ={matches}  multiplayerMatches = {multiplayerMatches} setMultiplayerMatches = {setMultiplayerMatches} isGameWon = {isGameWon} setGameWon ={setGameWon} setReset = {setReset} reset ={reset}></Multiplayer>
      {isMultiplayer && <Fragment>
      <Matches  id = '2' player = {player} isMultiplayer ={isMultiplayer} matches = {player.name === "Player 2" ? matches : multiplayerMatches} deckSize = {deckSize} reset = {reset}></Matches>
      <Player player = "Player 1"></Player>
      <Player player = "Player 2"></Player>
      </Fragment>
       }
    </div>
  )
}
export default App
