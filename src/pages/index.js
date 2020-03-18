import React, {useState, useEffect} from "react"
// import { Link } from "gatsby"

import Deck from "../components/deck"
import Matches from "../components/matches"
import Reset from "../components/reset"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const App = () => {
  const [matches, setMatches] = useState([])
  const [deckSize, setDeckSize] = useState()
  const [reset, setReset] = useState(false)

  useEffect(() => {
    if (matches.length === deckSize) {
      setTimeout(() => {
        alert("You Win!")
      }, 1000)
    }
  }, [matches, deckSize])


  return (
    <div>
      <Deck setMatches = {setMatches} setDeckSize = {setDeckSize} reset = {reset} setReset = {setReset}/>
      <Matches matches = {matches} deckSize ={deckSize} />
      <Reset setReset = {setReset}/>
    </div>
  )
}
export default App
