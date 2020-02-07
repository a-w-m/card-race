import React, { useState, useEffect } from "react"

import Card from "./card.js"
import icons from "./icons.module.css"
import { checkPropTypes } from "prop-types"

console.log("ok")


const Deck = ({onClick, color, history}) => {

  const createDeck = () => {
    const deck = []

    for (const property in icons) {
     
      const card = (
        <Card
          key={property}
          id = {property}
          onClick={() => onClick([{backgroundColor: "black"}, property])}
          className={icons[property]}
          history ={history}    
          color = {color}    />
      )

      const duplicate = (
        <Card
          key={`${property}-duplicate`}
          onClick={() => onClick([{backgroundColor: "black"}, property])}
          className={icons[property]}
          history ={history}
          id ={`${property}-duplicate`}
          color = {color}
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

return (<div>{shuffled.map((component, index) => (
  <React.Fragment key={index}>
      { component }
</React.Fragment>))}</div>
)}

export default Deck
