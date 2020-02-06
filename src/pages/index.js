import React, { useState, useEffect } from "react"
// import { Link } from "gatsby"

import Deck from "../components/deck"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const App = () => {
  const [history, setHistory] = useState([])

  const handleClick = property => {
    console.log(property)
    setHistory(history => history.concat(property))
  }

  useEffect(() => {
    if (history.length >= 2) {
      if (
        history.length % 2 == 0 &&
        history[history.length - 1] === history[history.length - 2]
      ) {
        alert("match")
        setHistory(history => [])
      }
    }
  }, [history])

  return (
    <div>
      <Deck onClick ={handleClick}/>
    </div>
  )
}
export default App
