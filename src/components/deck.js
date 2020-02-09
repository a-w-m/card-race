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
  

  const updateHistory = id => {
    setHistory(history => history.concat(id))  
    

  }

  useEffect(() => {
    console.log(history)

    if (history.length >= 2) {
      if (
        history.length % 2 === 0 &&
        history[history.length - 1] === history[history.length - 2]
      ) {
        alert("match")
        setHistory([])
      }
     
  }}, [history])

  return (
    <div className = {deckStyle.deckContainer}>
      {deck.map(position => {
        console.log(position.property, position.id)
        return (
         
            <Card  key={position.id} id={position.property} className={icons[position.property]} onClick ={updateHistory} history ={history}/>
       
        )
      })}
    </div>
  )
}

export default Deck
