import React, { useState, useEffect, useCallback } from "react"

import Card from "./card.js"
import icons from "./icons.module.css"
import deckStyle from "./deck.module.css"

let history = []
let flip = {}
let flip2 ={}

const updateHistory = card => history.push(card)

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
    let card = <Card
    key={id}
    id={id}
    className= {property}
    
  />

  let duplicate = <Card
  key={id+ 1}
  id={id + 1}
  className= {property}

/>



    initial.push(card, duplicate)
    id += 2
  }

  return initial
}

const Deck = () => {
  const [matches, setMatches] = useState([])
  const [deck, shuffleDeck] = useState(() => {
    return shuffle(createDeck())
  })

  const [currentCards, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "ADD_CARD":
          if (state[0].class === "" || state.length >= 2) {
            return [{ class: action.class, id: action.id }]
          } else if (state.length < 2) {
            return [...state, { class: action.class, id: action.id }]
          }
      }
    },
    [
      {
        class: "",
        id: "a",
      },
      {
        class: "",
        id: "b",
      },
    ]
  )

  const handleClick = card => {
    updateHistory(card.class)
    dispatch({ ...card, type: "ADD_CARD" })

  }

  useEffect(() => {
    if (
      currentCards.length === 2 &&
      currentCards[0].class !== currentCards[1].class
    ) {
      flip = { transform: "rotateY(0deg)" }
    } else if (
      currentCards.length == 2 &&
      currentCards[0].class === currentCards[1].class
    ) {
      setMatches(prev => prev.concat(currentCards[0].class))
    }
  }, [currentCards])

  const onClick = () => handleClick()

  return (
    <div className={deckStyle.deckContainer}>
      
    {deck.map(card => {

          return (
            React.cloneElement(card, {onClick})
          )
      
      })}
    </div>
  )}


export default Deck
