import React from "react"
import Icon  from "./icon.js"
import styles from "./card.module.css" 




const Card = props => {
  const {className, style, onClick} = props

  const handleClick = property => {
        onClick(property)
  }
 
  

  return (
    <div className = {styles.card} style={style} onClick={() => handleClick(style)}>
        <Icon className = {className}></Icon>
    </div>
  )
}

export default Card
