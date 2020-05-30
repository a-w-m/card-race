import React, { useState, useEffect } from "react"
// import { Link } from "gatsby"

import Deck from "../components/deck"
import Matches from "../components/matches"
import Reset from "../components/reset"
import GameWon from "../components/GameWon"
import Timer from "../components/timer"
import Scores from "../components/scores"

//import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const App = () => {
  const [matches, setMatches] = useState([])
  const [deckSize, setDeckSize] = useState()
  const [reset, setReset] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [timer, setTimer] = useState(0)
  const [isGameWon, setGameWon] = useState(false)

  useEffect(() => {
    if (matches.length === deckSize) {
      setGameWon(true)
    }
  }, [matches, deckSize])

  useEffect(() => {
    if (reset) {
      setStartTime(null)
      setTimer(0)
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
      />
      <div className="gameInfoContainer">
        <Timer
          timer={timer}
          setTimer={setTimer}
          startTime={startTime}
          isGameWon={isGameWon}
        ></Timer>
        <Reset setReset={setReset} />
      </div>
      <Scores></Scores>
      {isGameWon && (
        <GameWon setGameWon={setGameWon} endTime={timer} setReset={setReset}  isGameWon = {isGameWon}/>
      )}
    </div>
  )
}
export default App
