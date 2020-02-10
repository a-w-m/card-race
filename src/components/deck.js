import React, { useState, useEffect, useCallback } from "react"

import Card from "./card.js"
import icons from "./icons.module.css"
import deckStyle from "./deck.module.css"

let history = []
let matches = []
let flip = {}

const shuffle = arr => {
  let copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    let temp = copy[i]
    copy[i] = copy[randomIndex]
    copy[randomIndex] = temp
  }
  return copy
}



const createDeck = () => {
  let initial = []
  let id = 0

  for (const property in icons) {
    initial.push(
      { property: property, id: id },
      { property: property, id: id + 1 }
    )
    id += 2
  }

  return initial
}

const Deck = () => {
  const [deck, shuffleDeck] = useState(() => {
    return shuffle(createDeck())
  })

  const [matches, setMatches] = useState([])
  const [wrongGuess, setGuess] = useState(false)
  // const [flip, setFlip] = useState({})
  const [currentCard, setCurrentCard] = useState([" ", " "])
 
  const updateHistory = (card) => {
    history.push(card.class)

    setCurrentCard(currentCard.concat(card.id))

    flip = { transform: "rotateY(180deg)" }

    setGuess(false)
    if (history.length % 2 === 0 && history.length >= 2) {
      if (history[history.length - 1] === history[history.length - 2]) {
        setMatches(matches.concat(history[history.length - 1]))
        history = []
        setGuess(false)
      } else if (history[history.length - 1] !== history[history.length - 2]) {
        history = []
        setGuess(true)
        
      }
    }
  }

useEffect(()=>{
  
  if(currentCard.length%2 ==0 && wrongGuess){
    flip = {width: "100rem"}

}

},[currentCard, wrongGuess])

 

  return (
    <div className={deckStyle.deckContainer}>
      {deck.map(position => {
        if (matches.includes(icons[position.property])) {
          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={updateHistory}
              style={{ transform: "rotateY(180deg)" }}
            />
          )
        }
    
        else if (
          (currentCard.length % 2 === 0 &&
            (currentCard[currentCard.length - 1] === position.id ||
              currentCard[currentCard.length - 2] === position.id)) ||
          (currentCard.length % 2 === 1 &&
            currentCard[currentCard.length - 1] === position.id)
        ) {

          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={updateHistory}
              style={flip}
            />
          )
        } else {
          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={updateHistory}
              style={{ transform: "" }}
            />
          )
        }
      })}
    </div>
  )
}

export default Deck
