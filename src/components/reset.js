import React from "react"

const Reset = (props) =>{
    const {setReset} = props

    const handleClick =() =>{

        setReset(prev=> !prev)
    }

    return(
    <button onClick = {()=> handleClick()} >Reset</button>
    )

}

export default Reset