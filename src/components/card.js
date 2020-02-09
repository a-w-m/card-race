import React, {useState, useEffect, useCallback} from "react"
import Icon  from "./icon.js"
import styles from "./card.module.css" 


const Card = props => {

    
  const {className, id, onClick, history} = props;
 
  const [flip, setFlip] = useState({})


  const handleClick = useCallback(() => {    
 onClick(className)
 setFlip({ transform: "rotateY(180deg)"})
}, [])

      
 
  

  return (
    <div className = {styles.scene} onClick ={handleClick} >
    <div className = {styles.card} style = {flip}>
    <div id = {id} className = {`${styles.cardFace} ${styles.cardFaceFront}`} ></div>
    <div className = {`${styles.cardFace} ${styles.cardFaceBack}`}>
        <Icon className ={className}></Icon>
    </div>
    </div>
    </div>
    
  )
}

export default Card
