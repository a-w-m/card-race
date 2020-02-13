import React, { useState, useEffect, useCallback } from "react"
import Icon from "./icon.js"
import styles from "./card.module.css"

const Card = props => {
  const { className, id, handleClick,} = props

  const handleClickCard = card => {
    handleClick(card)
  }

  return (
    <div
      className={styles.scene}
      onClick={() => handleClickCard({class: className, id: id })}
    >
      <div className={styles.card} style={{transform: "rotateY(180deg)"}}>
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
