import React from "react"
import resetStyles from "./reset.module.css"
const Reset = props => {
  const { setReset } = props

  const handleClick = () => {
    setReset(prev => !prev)
  }

  return (
    <button
      className={resetStyles.resetButton}
      onClick={() => handleClick()}
      tabIndex="0"
    >
      Reset
    </button>
  )
}

export default Reset
