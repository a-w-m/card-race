import React, {useState, useEffect} from "react"

import Card from "./card.js"
import icons from "./icons.module.css"



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



const Deck = React.memo(() => {

 

  const createDeck = () => {
    const initial= []

    for (const property in icons) {
     
      const card = (
        <Card
          key={property}
          id = {property}
          className={icons[property]}
     
         />
      )

      const duplicate = (
        <Card
          key={`${property}-duplicate`}
          className={icons[property]}
          id ={`${property}-duplicate`}
         
        />
      )

      initial.push(card, duplicate)
    }
    return initial
  }

  
  
    const shuffled = shuffle(createDeck())

 
 

return (<div>{shuffled}</div>
)})

export default Deck
