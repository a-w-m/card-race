import React from "react"
import Icon  from "./icon.js"
import styles from "./card.module.css" 




const Card = props => {
  const {className, style, onClick} = props
  

  return (
    <div className = {styles.card} style={style} onClick={onClick}>
        <Icon className = {className}></Icon>
    </div>
  )
}

export default Card
