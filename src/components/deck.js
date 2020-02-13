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
    initial.push(
      { property: property, id: id },
      { property: property, id: id + 1 }
    )
    id += 2
  }

  return initial
}

const Deck = () => {
  const [matches, setMatches] = useState([])
  // const [flip, setFlip] = useState({})
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

    currentCards.length ==1 ? flip = { transform: "rotateY(0deg)" } : flip2 ={transform: "rotateY(180deg)" }


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

  return (
    <div className={deckStyle.deckContainer}>
      {deck.map(position => {
        if (matches.includes(icons[position.property])) {
          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={handleClick}
              style={{ transform: "rotateY(180deg)" }}
            />
          )
        } else if (history.length % 2 ==1 && currentCards[0].id === position.id){
        
        return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={handleClick}
              style={flip}
            />
          )}
        
        else if (history.length % 2 ==0 && currentCards[1].id === position.id)
         {
          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={handleClick}
              style={flip2}
            />
          )
          
        } else {
          return (
            <Card
              key={position.id}
              id={position.id}
              className={icons[position.property]}
              onClick={handleClick}
              style={{ transform: "" }}
            />
          )
        }
      })}
    </div>
  )
}

export default Deck
