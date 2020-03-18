import React from "react"
import Icon from "./icon.js"
import styles from "./card.module.css"

const Card = props => {
  const { className, id, handleClick, style} = props

<<<<<<< HEAD
    
  const {className, id, onClick, style, ref} = props;
 
  const [flip, setFlip] = useState({})


  const handleClick = useCallback((card) => {    
 onClick(card)

}, [onClick])

      
 
  

  return (
    <div className = {styles.scene} onClick ={()=>handleClick({"class":className, id: id })} >
    <div className = {styles.card} style = {style} ref ={ref}>
    <div id = {id} className = {`${styles.cardFace} ${styles.cardFaceFront}`} ></div>
    <div className = {`${styles.cardFace} ${styles.cardFaceBack}`}>
        <Icon className ={className}></Icon>
    </div>
    </div>
=======
  const handleClickCard = card => {
    if (style.transform === "rotateY(0deg)"){
    handleClick(card)
    }
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
>>>>>>> flip
    </div>
  )
}

export default Card
