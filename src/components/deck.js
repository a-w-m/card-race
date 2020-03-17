import React, { useState, useEffect, useRef } from "react"

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

const flipCardToFace = (deck, card) => {
  const { id } = card
  deck.forEach(card => {

    if (card.id === id) {
        card.style = { transform: "rotateY(180deg)"}
    }
  })
  return deck
}

const flipCardToBack = (deck, cards) =>{
  const cardOne = cards[0].id
  const cardTwo = cards[1].id

  deck.forEach(card => {

    if (card.id === cardOne || card.id === cardTwo) {
        card.style = { transform: "rotateY(0deg)"}
    }
  })
  return [...deck]
}


const createDeck = () => {
  let initial = []
  let id = 0

  for (const property in icons) {
    let card = {
      id,
      className: icons[property],
      style: { transform: "rotateY(0deg)" },
    }

    let duplicate = { ...card, id: id + 1 }

    initial.push(card, duplicate)
    id += 2
  }

  return initial
}

const Deck = () => {
  const [deck, setDeck] = useState(() => {
    return shuffle(createDeck())
  })
  const container = useRef(null)
  const [currentCards, setCurrentCards] = useState([])
  const [matches, setMatches] = useState([])

  const handleClick = card => {
    setDeck(prev => {
      return flipCardToFace(prev, card)
    })
    setCurrentCards(prev => prev.concat(card))
  }

  useEffect(() => {
    if (
      currentCards.length === 2 &&
      currentCards[0].class !== currentCards[1].class
    ) {
      container.current.style.pointerEvents = 'none';
      setCurrentCards([])

      setTimeout(()=> {
        
        setDeck(prev => {
        return flipCardToBack(prev, currentCards)
      })

      container.current.style.pointerEvents = 'auto';
    
    }, 1500)
    } else if (
      currentCards.length === 2 &&
      currentCards[0].class === currentCards[1].class
    ) {
      setMatches(prev => prev.concat(currentCards))
      setCurrentCards([])
    }
  }, [currentCards])

  useEffect(()=>{
    if(matches.length === deck.length){
      alert("You Win!")
    }
  }, [deck, matches])

  return (
    <div className={deckStyle.deckContainer} ref = {container}>
      {deck.map(card => {
        return (
          <Card
            key={card.id}
            id={card.id}
            className={card.className}
            handleClick={handleClick}
            style={card.style}
          />
        )
      })}
    </div>
  )
}

export default Deck
