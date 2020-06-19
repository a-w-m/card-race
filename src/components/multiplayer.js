import React, { useState, useEffect, useRef, useCallback, Fragment, createRef, forwardRef } from "react"
import styles from "./multiplayer.module.css"
import { popout } from "./GameWon.module.css"
import { Overlay, CloseButton } from "./GameWon.js"

const Multiplayer = props => {
  const [isLobby, setIsLobby] = useState(false)
  const [joinPrompt, setJoinPrompt] = useState(false)
  const [room, setRoom] = useState("")
  const [input, setInput] = useState(null)
  const [message, setMessage] = useState(null)
  const [winner, setWinner] = useState(null)

  const {
    isMultiplayer,
    setIsMultiplayer,
    socket,
    matches,
    setMultiplayerMatches,
    isGameWon,
    setReset,
    reset,
    player,
    setPlayer
  } = props

  function handleCreateRoom() {
    socket.emit("create room", "Player 1")
    setIsMultiplayer(true)
    setIsLobby(true)
    setPlayer(prev => {
      return { ...prev, name: "Player 1" }
    })
  }

  function handleJoinRoom() {
    setJoinPrompt(true)
  }

  function handleSubmitRoom(e) {
    e.preventDefault()
    socket.emit("join request", input)
  }

  useEffect(() => {
    socket.on("created room", room => {
      setRoom({ id: room, clients: 1 })
    })

    socket.on("joined room", room => {
      setRoom({ id: room, clients: 2 })
      setJoinPrompt(false)
      setIsMultiplayer(true)
      setIsLobby(true)
      setPlayer(prev => {
        return { ...prev, name: "Player 2" }
      })
    })

    socket.on("failed join room", data => {
      setMessage("Failed to join room, try again.")
    })

    socket.on("player 2 joined room", room => {
      setRoom({ id: room, clients: 2 })
    })

    socket.on("player disconnect", () => {
      setRoom(prev => {
        return { ...prev, clients: 1 }
      })

      if (player.name === "Player 2") {
        setPlayer(prev => {
          return { ...prev, name: "Player 1" }
        })
      }
    })
  }, [socket, player, setIsMultiplayer, setPlayer])

  useEffect(() => {
    socket.emit("multiplayerMatch", { matches, room })

    socket.on("multiplayerMatch", matches => {
      setMultiplayerMatches(matches)
    })

    socket.on("finish", name => {
      if (winner=== null) {
        setWinner(name)
      }
    })

    return () => {
      socket.off("finish")
    }
  }, [socket, matches, setMultiplayerMatches, room, winner])

  useEffect(() => {
    if (isGameWon && isMultiplayer) {
      socket.emit("finish", { player, room })
      setIsLobby(true)

      if (winner === null) {
        setWinner(player.name)
      }
    }
  }, [socket, room, player, isGameWon, isMultiplayer, winner, reset])

  return (
    <div className={styles.dropdownContainer} >
      <button className={styles.dropdownButton} style = {isMultiplayer? {visibility: 'hidden'} : {}}>Multiplayer</button>
      <div
        className={styles.dropdownContent}
        style={isLobby || joinPrompt ? { display: "none" } : {}}
      >
        <a href="#host" onClick={() => handleCreateRoom()}>
          Create
        </a>
        <a href="#join" onClick={() => handleJoinRoom()}>
          Join
        </a>
      </div>

      {joinPrompt && (
        <JoinRoom
          handleSubmitRoom={handleSubmitRoom}
          input={input}
          setInput={setInput}
          setJoinPrompt={setJoinPrompt}
          message={message}
        />
      )}
      {isLobby && (
        <Lobby
          setIsMultiplayer={setIsMultiplayer}
          isLobby={isLobby}
          setIsLobby={setIsLobby}
          setPlayer={setPlayer}
          player={player}
          winner={winner}
          setWinner={setWinner}
          room={room}
          socket={socket}
          setReset={setReset}
        />
      )}
    </div>
  )
}

const JoinRoom = props => {
  const { handleSubmitRoom, input, setInput, setJoinPrompt, message } = props
  const inputEl = useRef(null)

  function handleClick() {
    setJoinPrompt(false)
  }

  function handleKeyDown(event) {
    event.preventDefault()
    handleClick()
  }

  useEffect(()=>{
    inputEl.current.focus()

  })
  return (
    <div>
      <div className={popout}>
        <form onSubmit={handleSubmitRoom} className={styles.submitRoom}>
          <label htmlFor="roomPrompt">Enter room number</label>
          <input
            type="text"
            id="roomPrompt"
            name="roomPrompt"
            default="enter room #"
            value={input}
            ref ={inputEl}
            onChange={event => {
              setInput(event.target.value)
            }}
          />
          <button type="submit">OK</button>
          <section>{message}</section>
        </form>
        <CloseButton
          handleClick={handleClick}
          handleKeyDown={handleKeyDown}
        ></CloseButton>
      </div>
      <Overlay />
    </div>
  )
}

const Lobby = props => {
  const {
    setIsMultiplayer,
    isLobby,
    setIsLobby,
    player,
    room,
    socket,
    winner,
    setWinner,
    setReset,
  } = props

  const [whoIsReady, setWhoIsReady] = useState([])

  function handleClick() {
    socket.emit("leave lobby", room)
    setIsLobby(false)
    setIsMultiplayer(false)
    setReset(true)
  }

  function handleKeyDown(event) {
    if (event.keyCode === 27) {
      handleClick()
    }
  }

  useEffect(() => {
    if (whoIsReady.length === 2) {
      setReset(true)
    }
  }, [whoIsReady, setReset])

  useEffect(()=>{
    if (!isLobby){
      setWinner(null)
    }
  }, [isLobby, setWinner])

  return (
    <div>
      <div className={popout}>
        <div className={styles.lobbyContainer}>
          <LobbyHeader
            player={player}
            room={room}
            winner={winner}
          ></LobbyHeader>
          <LobbyReadyForm
            isLobby={isLobby}
            player={player}
            room={room}
            socket={socket}
            setWhoIsReady={setWhoIsReady}
            whoIsReady={whoIsReady}
            setWinner ={setWinner}
            setIsLobby ={setIsLobby}
            winner = {winner}
          />
        </div>
        <CloseButton
          handleClick={handleClick}
          handleKeyDown={handleKeyDown}
        ></CloseButton>
      </div>
      <Overlay />
    </div>
  )
}

const CountdownCircle = props => {
  const { setIsLobby, setWinner } = props
  const timeRemaining = useRef(null)

  function timeFraction(timeElapsed, timeLimit) {
    return timeElapsed / timeLimit
  }

  useEffect(() => {
    let id
    let length = 283
    let limit = 3
    let count = limit

    id = setInterval(() => {
      count -= 1
      let remainingTime = (length * timeFraction(count, limit)).toFixed()

      console.log(remainingTime)
      timeRemaining.current.style.strokeDasharray = `${remainingTime} ${length}`

      if (count <= -1) {
        setIsLobby(false)
        setWinner(null)
      }
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [setIsLobby, setWinner])

  return (
    <div className={styles.baseTimer}>
      <svg
        className={styles.baseTimerSVG}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.baseTimerCircle}>
          <circle
            className={styles.baseTimerPathElapsed}
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            strokeDasharray="283"
            className={styles.baseTimerPathRemaining}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
            ref={timeRemaining}
          ></path>
        </g>
      </svg>
    </div>
  )
}

const WaitingMessage = () => {
  return (
  <section className={styles.waiting}>Waiting for second player to join</section>
  )
}

const LobbyHeader = props => {
  const { room, winner } = props

  function handleCopy(room) {
    let temp = document.createElement("textarea")
    temp.value = room
    document.body.appendChild(temp)
    temp.select()
    document.execCommand("copy")
    document.body.removeChild(temp)
  }

  return (
    <div className={styles.lobbyheader}>
      <h1>Multiplayer Lobby</h1>

      <section className={styles.roomId}>
        Room #: {room.id}
        <span
          onClick={() => handleCopy(room.id)}
          className={styles.clipboard}
          title="copy room #"
          role="img"
          aria-label="copy"
        >
          &#128203;
        </span>
      </section>
      {winner && <section className ={styles.winner}>{winner} wins!</section>}
    </div>
  )
}

const LobbyReadyForm = props => {
  const { player, room, socket, setWhoIsReady, whoIsReady, isLobby, setIsLobby, setWinner, winner} = props
  const inputPlayer1 = createRef();
  const inputPlayer2 = createRef();

  const addToReadyArray = useCallback(
    name => {
      setWhoIsReady(prev => prev.concat(name))
    },
    [setWhoIsReady]
  )

  const removeFromReadyArray = useCallback(
    name => {
      setWhoIsReady(prev => prev.filter(elem => elem !== name))
    },
    [setWhoIsReady]
  )


  function sendReadyStatus(ref) {
    if (ref.current.checked) {
      addToReadyArray(player.name)
      socket.emit("isReady", { room, player, isReady: true })
    } else {
      removeFromReadyArray(player.name)
      socket.emit("isReady", { room, player, isReady: false })
    }
  }


  useEffect(()=>{



    if (whoIsReady.length>= 0 && inputPlayer1.current!== null && inputPlayer2.current!==null){

      inputPlayer1.current.checked = false;
      inputPlayer2.current.checked = false;

    whoIsReady.forEach(elem=>{
      if(elem === "Player 1"){
        inputPlayer1.current.checked = true
      }else if (elem === "Player 2"){
        inputPlayer2.current.checked = true
      }
    })

  } 

    
  }, [whoIsReady, inputPlayer1, inputPlayer2])



  useEffect(()=>{

    socket.on('isReady', ({name, isReady})=>{

      if (isReady){
        addToReadyArray(name)
      }
      else{
        removeFromReadyArray(name)
      }
    })

    return ()=> socket.off('isReady')

  })

  useEffect(()=>{
    if(winner!==null && winner!==player.name){
      console.log('req')
      socket.emit('getReadyStatus', room)
    }

  },[player.name, room, socket, winner])

  useEffect(()=>{
    socket.on('getReadyStatus', (room)=>{
      console.log('req received', whoIsReady)
      socket.emit('sendReadyStatus', ({room, whoIsReady}))
    })

    socket.on('sendReadyStatus', whoIsReady=>{
      console.log('response received', whoIsReady)
        setWhoIsReady(whoIsReady)
    })

    return ()=>{
      socket.off('getReadyStatus')
      socket.off('sendReadyStatus')
    }
  })


  useEffect(() => {
    if (whoIsReady.length === 2) {
      inputPlayer1.current.disabled = "disabled"
      inputPlayer2.current.disabled = 'disabled'
    }
  })



  return (
    <div className={styles.lobbyForm}>
      {room.clients === 2 ? <section>Ready? Click checkbox to begin!</section>
      :<WaitingMessage></WaitingMessage>}

           {whoIsReady.length === 2 && (
            <CountdownCircle setIsLobby={setIsLobby} setWinner = {setWinner}></CountdownCircle>
          )}
      <div className={styles.ready}>
      {room.clients === 2 && (<Fragment>

        <PlayerCheckbox
          isLobby={isLobby}
          whoIsReady={whoIsReady}
          setWhoIsReady={setWhoIsReady}
          player={player}
          id="1"
          room={room}
          socket={socket}
          winner ={winner}
          ref = {inputPlayer1}
          handleClick = {sendReadyStatus}
        ></PlayerCheckbox>
     
          <PlayerCheckbox
            whoIsReady={whoIsReady}
            setWhoIsReady={setWhoIsReady}
            player={player}
            id="2"
            room={room}
            socket={socket}
            winner = {winner}
            ref = {inputPlayer2}
            handleClick ={sendReadyStatus}
          ></PlayerCheckbox>
          </Fragment> 
        ) 
        }
      </div>
    </div>
  )
}


const PlayerCheckbox = forwardRef((props, ref) => {
  const { player, id, handleClick } = props

  return (
    <div className={styles.playerCheckboxContainer}>
      <div className={styles.labelContainer}>
        <label for={`Player${id}`} className = {id==='1'? styles.playerOneLabel : styles.playerTwoLabel}>
          {id === "1" ? "Player 1" : "Player 2"}
        </label>
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id={`Player${id}`}
          ref={ref}
          onClick={() => handleClick(ref)}
          disabled={player.name.slice(-1) !== id ? "disabled" : ""}
        />
      </div>
    </div>
  )
})

export default Multiplayer
