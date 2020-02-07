import React, { useState, useEffect } from "react"
// import { Link } from "gatsby"

import Deck from "../components/deck"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const App = () => {
  const [history, setHistory] = useState([])
  const [color, setColor] = useState({backgroundColor: "red"}) 
  const [currentCard, setCurrentCard] = useState()


  const updateColor = (param) => {
    let newColor = param[0]
    let card = param[1]

    setHistory(history => history.concat(card))
    setColor({...newColor});
    console.log(color)
  }
  
  useEffect(() => {

    if (history.length === 1) {
      
    }

    else if (history.length >= 2) {
      if (
        history.length % 2 === 0 &&
        history[history.length - 1] === history[history.length - 2]
      ) {
        alert("match")
        setHistory(history => [])
       
      }
    }
  }, [history, color])

  return (
    <div>
      <Deck onClick ={updateColor} color ={color} history = {history}/>
    </div>
  )
}
export default App
