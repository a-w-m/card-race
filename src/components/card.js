import React from "react"
import Icon from "./icon.js"
import styles from "./card.module.css"

const Card = props => {
  const { className, id, handleClick, style, disabled} = props

  const handleClickCard = card => {
    handleClick(card)
  }

  return (
    <div>
    <button
      className={styles.scene}
      onClick={() => handleClickCard({class: className, id: id })}
      disabled = {disabled} 
    >
      <div className={styles.card} style={style}>
        <div
          id={id}
          className={`${styles.cardFace} ${styles.cardFaceFront}`}
        ></div>
        <div className={`${styles.cardFace} ${styles.cardFaceBack}`}>
          <Icon className={className}></Icon>
        </div>
      </div>
    </button>
    </div>
  )
}

export default Card
