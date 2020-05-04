import React, { useState, useEffect, useRef} from "react"

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
      card.style = { transform: "rotateY(180deg)" }
    }
  })
  return deck
}

const flipCardToBack = (deck, cards) => {

    deck.forEach(card => {

      cards.forEach(currentCard => { 


      if (card.id === currentCard.id) {
        card.style = { transform: "rotateY(0deg)" }
      }


    })
  })


 

  return [...deck]
}

const checkMatch = cards => {
  /**
   * checks whether the first two cards in the array share the same class
   * @param {Array} cards
   * @return {boolean}
   */

  if (cards[0].class === cards[1].class) {
    return true
  } else {
    return false
  }
}


const disableClick = (ref)=>{
    ref.current.style.pointerEvents = "none" 
}

const enableClick = (ref) =>{
  ref.current.style.pointerEvents = "auto"
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

const Deck = (props) => {
  const {setMatches, setDeckSize, reset, setReset, startTime, setStartTime} = props
  const [deck, setDeck] = useState(() => {
    return shuffle(createDeck())
  })
  const [currentCards, setCurrentCards] = useState([])
  const container = useRef(null)

  useEffect(() => {
    setDeckSize(deck.length)

  }, [setDeckSize, deck.length])

  

  const handleClick = card => {

    if (!startTime){
      setStartTime(Date.now())
    }

    setDeck(prev => {
      return flipCardToFace(prev, card)
    })
    setCurrentCards(prev => prev.concat(card))
  }

  useEffect(() => {
    if (currentCards.length === 2) {

      if (checkMatch(currentCards)) {

        setMatches(prev => prev.concat(currentCards))

        setCurrentCards([])
      } else if (!checkMatch(currentCards)) {

        disableClick(container)
        setCurrentCards([])

        setTimeout(() => {

          setDeck(prev => {
            return flipCardToBack(prev, currentCards)
          })

          enableClick(container)
        }, 1500)
      }
    }
  }, [currentCards, setMatches])

  useEffect(()=>{
    if (reset){
      
      setStartTime(null)

      disableClick(container)

      setTimeout( async ()=> {

        setDeck(prev => {
          return flipCardToBack(prev, prev)
        })

        setCurrentCards([])
        setMatches([])
      

      }, 500)

      setTimeout( async ()=> {

        setDeck(prev => {
          return shuffle(prev)
        })

        setReset(!reset)

        enableClick(container)




      }, 1000)


      //return clearTimeout
    }
  }, [reset, setMatches, setReset, currentCards, setStartTime])

  

  return (
    <div className={deckStyle.deckContainer} ref={container}>
      {deck.map(card => {
        return (
          <Card
            key={card.id}
            id={card.id}
            className={card.className}
            handleClick={handleClick}
            style={card.style}
            setStartTime = {setStartTime}
          />
        )
      })}
    </div>
  )
}

export default Deck
