import React, {useEffect, useRef, useState, Fragment} from "react"
import styles from "./matches.module.css"

const Matches = props =>{
    const {deckSize, matches, isMultiplayer, reset, id} = props;
    const container = useRef(null);
    const [widthStyle, setWidthStyle] = useState({});
    const [color, setColor] = useState({})
 
    
    useEffect(()=>{
        const containerWidth = container.current.getBoundingClientRect().width
        const width = (containerWidth/(deckSize/2))
        if (matches.length>0){
        setWidthStyle({width: width * (matches.length/2)})
        }

    
    }, [matches, deckSize])

    useEffect(()=>{
        if (reset){
            setWidthStyle({width: 0})
        }
    }, [reset])

    useEffect(()=>{
        if(id === '1'){
            setColor('playerOneProgressBar')

        }else{
            setColor('multiplayerProgressBar')
        }

    }, [setColor, id])


    return(
        <Fragment>
        <div className = {isMultiplayer ? `${styles.matches} ${styles.multiplayerMatches}`: styles.matches} ref = {container}>
        <div className = { styles.progressBar}   id = {styles[color]} style = {widthStyle}></div>
        </div>
                <div className = {isMultiplayer? ` ${styles.start} ${styles.multiplayerStart}` : styles.start}>Start</div>
                <div className = {isMultiplayer? ` ${styles.finish} ${styles.multiplayerFinish}` : styles.finish}>Finish</div>
                </Fragment>

    )

}

export default Matches