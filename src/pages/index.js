import React, {useState, useEffect} from "react"
// import { Link } from "gatsby"

import Deck from "../components/deck"
import Matches from "../components/matches"
import Reset from "../components/reset"
import GameWon from "../components/GameWon"
import Timer from "../components/Timer"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const App = () => {
  const [matches, setMatches] = useState([])
  const [deckSize, setDeckSize] = useState()
  const [reset, setReset] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const[endTime, setEndTime] = useState(0)
  const[timer, setTimer] = useState(0)
  const [isGameWon, setGameWon] = useState(false)

  useEffect(() => {
    if (matches.length === deckSize) {
      setGameWon(true)
      setEndTime ( timer )
      
    }
  }, [matches, deckSize])


  return (
    <div>
      <Deck setMatches = {setMatches} setDeckSize = {setDeckSize} reset = {reset} setReset = {setReset} startTime = {startTime} setStartTime = {setStartTime}/>
      <Matches matches = {matches} deckSize ={deckSize} />
      <Reset setReset = {setReset}/>
      <Timer timer = {timer} setTimer ={setTimer} startTime= {startTime} isGameWon = {isGameWon}></Timer>
      {isGameWon && <GameWon setGameWon = {setGameWon} endTime = {endTime} />} 
    </div>
  )
}
export default App
