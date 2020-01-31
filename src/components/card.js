import React from "react"


const Card = (props) => {
   // const [flip, setFlip] = useState(false);

   const {backgroundColor, children} = props;

    return (
        <div
        style = {{backgroundColor:backgroundColor}}>
            {children}
        </div>
    )



}


export default Card;