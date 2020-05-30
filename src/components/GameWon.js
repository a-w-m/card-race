import React, { useState, useRef, useEffect } from "react"
import styles from "./GameWon.module.css"
import axios from "axios"

const GameWon = props => {
  return (
    <div>
      <PopOut
        endTime={props.endTime}
        setGameWon={props.setGameWon}
        setReset={props.setReset}
        isGameWon={props.isGameWon}
      />
      <Overlay />
    </div>
  )
}
const PopOut = props => {
  const closeButton = useRef(null)

  function handleClick(e) {
    props.setGameWon(false)
    props.setReset(true)
  }

  function handleKeyDown(e) {
    console.log(e.keyCode)

    if (e.keyCode === 27) {
      handleClick()
    }
  }

  useEffect(() => {
    closeButton.current.focus()
  }, [])

  return (
    <div className={styles.popout}>
      <h1>You Win!</h1>
      <section>Your time was {`${props.endTime}`} seconds</section>
      <section>Enter your name to submit your time to the leaderboard:</section>
      <TimeForm endTime={props.endTime} setGameWon={props.setGameWon} />
      <Replay handleClick={handleClick} />
      <div
        className={styles.close}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={closeButton}
        tabIndex="-1"
        role="button"
      />
    </div>
  )
}

const TimeForm = props => {
  const [input, setInput] = useState()
  const [submitMessage, setSubmitMessage] = useState()
  const submitButton = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    axios
      .post(
        "/api/scores",

        { name: input, time: props.endTime }
      )
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setSubmitMessage("Success")
          submitButton.current.setAttribute("disabled", true)
        }
      })
      .catch(err => {
        const [data] = err.response.data.errors
        console.log(err.response.status)
        if (err.response.status === 422) {
          if (data.param === "name") {
            setSubmitMessage("Error: name must be between 3-8 characters")
          } else {
            setSubmitMessage("Error: time must be greater than 0")
          }
        }
      })
  }

  return (
    <div>
      <form className={styles.TimeForm} onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            default="name"
            placeholder="enter name"
            value={input}
            onChange={event => {
              setInput(event.target.value)
            }}
          />
        </label>
        <button
          type="submit"
          className={styles.ButtonSubmitTime}
          ref={submitButton}
        >
          Submit Time{" "}
        </button>
      </form>
      <Message>{submitMessage}</Message>
    </div>
  )
}

const Message = props => {
  return (
    <div className={styles.Message}>
      <span>{props.children}</span>
    </div>
  )
}
const Replay = props => {
  return (
    <button
      className={styles.ButtonPlayAgain}
      onClick={() => props.handleClick()}
    >
      Play Again
    </button>
  )
}

const Overlay = () => {
  return <div className={styles.overlay}></div>
}

export default GameWon
