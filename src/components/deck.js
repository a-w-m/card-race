import React, { useState, useEffect, useCallback } from "react"

import Card from "./card.js"
import icons from "./icons.module.css"
import deckStyle from "./deck.module.css"

let history = []
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

const cardsChosen = [
  {
    class: "",
    id: "",
  },
  { class: "", id: "" },
]

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_CARD":
      return [...state, { class: action.class, id: action.id }]
  }
}

const Deck = () => {
  const [matches, setMatches] = useState([])
  // const [flip, setFlip] = useState({})
  const [deck, shuffleDeck] = useState(() => {
    return shuffle(createDeck())
  })

  const [currentCards, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "ADD_CARD":
        
        return state[0].class === "" ? [{ class: action.class, id: action.id }] :[...state, {class: action.class, id: action.id} ] 
    }
  }, [ {
    class: "",
    id: "",
  }])


  const updateHistory = card => {
    history.push(card.class)
    dispatch({...card, type: "ADD_CARD"})
    

    flip = { transform: "rotateY(180deg)" }
  }

  // useEffect(()=>{

  //   if(currentCard.length%2 ==0 && wrongGuess){
  //     flip = {width: "100rem"}

  // }

  // },[currentCard, wrongGuess])

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
        } else if (
          currentCards[0].id === position.id ||
          currentCards[0].id === position.id
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
