import React, { useState, useEffect } from "react"

import Card from "./card.js"
import icons from "./icons.module.css"
import deckStyle from "./deck.module.css"

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

// let initial= [];
// let id = 0;

//   for (const property in icons) {

//     initial.push({property: property, id: id}, {property: property, id: id +1})

//     id += 2;
//     console.log(initial)
//   }

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

  const [history, setHistory] = useState([])
  const [matches, setMatches] = useState([])

  const updateHistory = card => {
    setHistory(history => history.concat(card.class))
  }

  useEffect(() => {
    console.log(history)

    if (history.length == 2) {
      if (history[0] === history[1]) {
        alert("match")
        setMatches(matches => matches.concat(history))
        setHistory(
          history => history.filter(card => matches.includes(card)) === false
        )
      }
    }
    else{
      setHistory(history => history.filter(card => matches.includes(card)) === true
      )
    }
  }, [history])

  return (
    <div className={deckStyle.deckContainer}>
      {deck.map(position => {
        if (matches.includes(position.id)) {
          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={updateHistory}
              style = {{ transform: "rotateY(180deg)"}}
            />
          )
        } else {
          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={updateHistory}
              style = {{ transform: "rotateY(0)"}}
            />
          )
        }
      })}
    </div>
  )
}

export default Deck
