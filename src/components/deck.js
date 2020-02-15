import React, { useState, useEffect} from "react"

import Card from "./card.js"
import icons from "./icons.module.css"
import deckStyle from "./deck.module.css"

let history = []
let flipToFace = { transform: "rotateY(180deg)" }
let flipToBack = { transform: "rotateY(0deg)" }
let currentCardsDefault =   [
  {
    class: "",
    id: "a",
  },
  {
    class: "",
    id: "b",
  },
]

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
    let card = <Card key={id} id={id} className={icons[property]} />

    let duplicate = (
      <Card key={id + 1} id={id + 1} className={icons[property]} />
    )

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
  const [style, setStyle] = useState(flipToBack)

  const [currentCards, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "ADD_CARD":
          if (state[0].class === "" || state.length >= 2) {
            return [{ class: action.class, id: action.id }]
          } else if (state.length < 2) {
            return [...state, { class: action.class, id: action.id }]
          }
          case "REMOVE_CARDS":
            {
              return currentCardsDefault
            }
      }
    },
    
     currentCardsDefault
    
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
      
      setTimeout( () => dispatch({type: "REMOVE_CARDS" }), 2000)
 
    } else if (
      currentCards.length === 2 &&
      currentCards[0].class === currentCards[1].class
    ) {
      setMatches(prev => prev.concat(currentCards[0].class))
    }
  }, [currentCards])

  return (
    <div className={deckStyle.deckContainer}>
      {deck.map(card => {
        if (matches.includes(card.props.className)) {
          return React.cloneElement(card, { handleClick, style: flipToFace })
        } else if (
          currentCards.filter(
            currentCard =>
              currentCard.class === card.props.className &&
              currentCard.id === card.props.id
          ).length> 0
        ) {
          return React.cloneElement(card, { handleClick, style: flipToFace })
        } else {
          return React.cloneElement(card, { handleClick, style: flipToBack })
        }
      })}
    </div>
  )
}

export default Deck
