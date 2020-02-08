import React, {useState, useEffect} from "react"
import Icon  from "./icon.js"
import styles from "./card.module.css" 




const Card = props => {
  const {className, id, onClick} = props;

  const [style, setStyle] = useState({backgroundColor:"red"})
  const [history, setHistory] = useState([])

  
  const handleClick = (id) => {
      
      setStyle({backgroundColor: "black",
    pointerEvents: "none"})

   setHistory(history => history.concat(...history, id))
      
      }

      useEffect(() => {
          console.log(history)
       
       if (history.length >= 2) {
          if (
            history.length % 2 === 0 &&
            history[history.length - 1] === history[history.length - 2]
          ) {
            alert("match")
            setHistory(history => [])
           
          }
        }
      }, [history])
    

 
  

  return (
    <div id = {id} className = {styles.card} onClick = {() => handleClick(className)} style = {style}>
        <Icon className = {className}></Icon>
    </div>
  )
}

export default Card
