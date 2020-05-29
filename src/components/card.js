import React from "react"
import Icon from "./icon.js"
import styles from "./card.module.css"

const Card = props => {
  const { className, id, handleClick, style } = props

  const handleClickCard = card => {
    if (style.transform === "rotateY(0deg)") {
      handleClick(card)
    }
  }

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleClick({ class: className, id: id })
    }
  }

  return (
    <div
      className={styles.scene}
      onClick={() => handleClickCard({ class: className, id: id })}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="button"
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
