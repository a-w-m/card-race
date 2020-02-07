import React from "react"
import Icon  from "./icon.js"
import styles from "./card.module.css" 




const Card = props => {
  const {className, id, onClick, history, color} = props


  return (
    <div className = {styles.card} onClick = {onClick} style = {history[history.length-1] === id ? color : {}}>
        <Icon className = {className}></Icon>
    </div>
  )
}

export default Card
