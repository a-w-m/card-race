import React, { useState, useEffect } from "react"

import Card from "./card.js"
import icons from "./icons.module.css"
import { checkPropTypes } from "prop-types"

const Deck = (props) => {

  const handleClick = (pointerEvents) => {
    props.onClick(pointerEvents)
  }



  const createDeck = () => {
    const deck = []

    for (const property in icons) {
     
      const card = (
        <Card
          key={property}
          onClick={() => handleClick(props.style)}
          className={icons[property]}
          style ={props.style}
        />
      )

      const duplicate = (
        <Card
          key={`${property}-duplicate`}
          onClick={() => handleClick(props.style)}
          className={icons[property]}
          style ={props.style}
        />
      )

      deck.push(card, duplicate)
    }
    return deck
  }

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

  const shuffled = shuffle(createDeck())
  const [deck, shuffleDeck] = useState(shuffled)

  return <div>{deck}</div>
}

export default Deck
