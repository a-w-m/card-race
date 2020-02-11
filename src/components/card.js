import React, {useState, useEffect, useCallback} from "react"
import Icon  from "./icon.js"
import styles from "./card.module.css" 


const Card = props => {

    
  const {className, id, onClick, style} = props;
 
 


  const handleClick = useCallback((card) => {    
 onClick(card)

}, [onClick])

      
 
  

  return (
    <div className = {styles.scene} onClick ={()=>handleClick({"class":className, id: id})} >
    <div className = {styles.card} style = {style}>
    <div id = {id} className = {`${styles.cardFace} ${styles.cardFaceFront}`} ></div>
    <div className = {`${styles.cardFace} ${styles.cardFaceBack}`}>
        <Icon className ={className}></Icon>
    </div>
    </div>
    </div>
    
  )
}

export default Card
