import React, { useState } from "react"
// import { Link } from "gatsby"

import Card from "../components/card"
import { checkPropTypes } from "prop-types"
// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const App = () => {
  const cards = ["red", "blue", "red", "blue"]

  const [backgroundColor, setbackgroundColor] = useState("");

  const [hasFlipped, setFlip] = useState(false);


  const styles = { 
    backgroundColor: backgroundColor,
      color: "black",
      border: ".1rem solid black"
  }

  const handleClick = (index) =>{
    alert(index)
  }



  return (
    <div>{cards.map((card, index) =>{
        return <Card style = {{backgroundColor: card}} onClick = {() => handleClick(index)}>
          {index}
        </Card>})}
        <div>Hello World</div>
    </div>
  )
}
export default App
