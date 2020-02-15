import React from "react"
import Icon from "./icon.js"
import styles from "./card.module.css"

const Card = props => {
  const { className, id, handleClick, style} = props

  const handleClickCard = card => {
    handleClick(card)
  }

  return (
    <div
      className={styles.scene}
      onClick={() => handleClickCard({class: className, id: id })}
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
    </div>
  )
}

export default Card
