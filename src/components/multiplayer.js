import React, { useState, useEffect, useRef } from "react"
import styles from "./multiplayer.module.css"
import { popout } from "./GameWon.module.css"
import { Overlay, CloseButton } from "./GameWon.js"

const Multiplayer = props => {
  const [isLobby, setIsLobby] = useState(false)
  const [joinPrompt, setJoinPrompt] = useState(false)
  const [room, setRoom] = useState("")
  const [player, setPlayer] = useState({ name: "" })
  const [input, setInput] = useState()
  const [message, setMessage] = useState()

  const { isMultiplayer, setIsMultiplayer, socket, matches, setMultiplayerMatches } = props

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
  }, [socket])


  useEffect(()=>{

    socket.emit("multiplayerMatch", {matches, room})

    socket.on('multiplayerMatch', matches=>{
      setMultiplayerMatches(matches)
    })

  }, [socket, matches])


  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton}>Multiplayer</button>
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
          setIsLobby={setIsLobby}
          setPlayer={setPlayer}
          player={player}
          room={room}
          socket={socket}
        />
      )}
    </div>
  )
}

const JoinRoom = props => {
  const { handleSubmitRoom, input, setInput, setJoinPrompt, message } = props

  function handleClick() {
    setJoinPrompt(false)
  }

  function handleKeyDown(event) {
    event.preventDefault()
    handleClick()
  }

  return (
    <div>
      <div className={popout}>
        <form onSubmit={handleSubmitRoom} className={styles.submitRoom}>
          <label for="roomPrompt">Enter room number</label>
          <input
            type="text"
            id="roomPrompt"
            default="enter room #"
            value={input}
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
  const { setIsLobby, player, room, socket } = props

  const [whoIsReady, setWhoIsReady] = useState([])

  function handleClick() {
    setIsLobby(false)
  }

  function handleKeyDown(event) {
    if (event.keyCode === 27) {
      handleClick()
    }
  }

  return (
    <div>
      <div className={popout}>
        <div className={styles.lobbyContainer}>
          <LobbyHeader player={player} room={room}></LobbyHeader>
          {whoIsReady.length === 2 && <CountdownCircle setIsLobby ={setIsLobby}></CountdownCircle>}
          <LobbyReadyForm player={player} room={room} socket={socket} setWhoIsReady = {setWhoIsReady} whoIsReady ={whoIsReady}/>
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


const CountdownCircle = (props) =>{
  const {setIsLobby} = props;
  const timeRemaining = useRef(null)

  function timeFraction(timeElapsed, timeLimit){
    return timeElapsed/timeLimit
  }

  function remainingTime(length, fraction){
    return (length * fraction).toFixed()
  }


  useEffect(()=>{
    let id;
    let length = 283
    let limit = 3;
    let count = limit;
    
      id =setInterval(()=>{
        count-=1;
        let remainingTime = (length * (timeFraction(count, limit))).toFixed()

        console.log(remainingTime)
        timeRemaining.current.style.strokeDasharray = `${remainingTime} ${length}`

        if(count<=-1){
          setIsLobby(false)
        }
        
      }, 1000)

      return(()=>{
        clearInterval(id)
      })

  }, [])

  return(
    <div className = {styles.baseTimer}>
      <svg className = {styles.baseTimerSVG} viewBox = '0 0 100 100' xmlns = "http://www.w3.org/2000/svg">
        <g className = {styles. baseTimerCircle}>
          <circle className ={styles.baseTimerPathElapsed} cx ="50" cy ="50" r ="45"></circle>
          <path  strokeDasharray ="283" className = {styles.baseTimerPathRemaining} d= "M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" ref = {timeRemaining} ></path>
        </g>
      </svg>
    </div>
  )
}

const TimerLabel = ()=>{
  const[count, setCount] = useState(3)
  const [start, setStart] = useState(false)

  useEffect(()=>{
    let id
    
  if(!start){
    id = setInterval(()=>{
      
      setCount(prev=>prev - 1)
      
    }, 1000)

  }

  
    return(()=>{
      clearInterval(id)
    })
  

  }, [start])


  useEffect(()=>{
    if(count === 0){
      setStart(true)
    }

    return(()=>{
      setStart(false)
    })
  }, [count])




  return(
  <span className ={styles.baseTimerLabel}>{count}</span>
  )

}
const WaitingMessage = () => {
  return <section className={styles.waiting}>Waiting for player 2</section>
}

const LobbyHeader = props => {
  
  const { room, player } = props

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
        >
          &#128203;
        </span>
      </section>
      {player.name === "Player 1" && (
        <section className={styles.note}>
          Second player requires room number to join
        </section>
      )}
    </div>
  )
}

const LobbyReadyForm = props => {
  const { player, room, socket, setWhoIsReady, whoIsReady } = props

  return (
    <div className={styles.lobbyForm}>
      <section>Ready? Click checkbox to begin!</section>
      <div className={styles.ready}>
        <PlayerCheckbox
          whoIsReady ={whoIsReady}
          setWhoIsReady = {setWhoIsReady}
          player={player}
          id="1"
          room={room}
          socket={socket}
        ></PlayerCheckbox>
        {room.clients === 2 ? (
          <PlayerCheckbox
          whoIsReady = {whoIsReady}
          setWhoIsReady = {setWhoIsReady}
            player={player}
            id="2"
            room={room}
            socket={socket}
          ></PlayerCheckbox>
        ) : (
          <WaitingMessage></WaitingMessage>
        )}
      </div>
    </div>
  )
}

const PlayerCheckbox = props => {
  const { room, player, id, socket, setWhoIsReady, whoIsReady } = props
  const input = useRef(null)

  function addToReadyArray(name){
    setWhoIsReady(prev=>prev.concat(name))
  }

  function removeFromReadyArray(name){
    setWhoIsReady(prev=>prev.filter(elem=>elem !== name))

  }

  function sendReadyStatus(ref) {
    if (ref.current.checked) {
      addToReadyArray(player.name)
      socket.emit("isReady", { room, player, isReady: true })
    } else {
      removeFromReadyArray(player.name)
      socket.emit("isReady", { room, player, isReady: false })
    }
  }

  function handleReadyStatus(name, isReady) {
    if (name.slice(-1) === id && isReady) {
      input.current.checked = true
      addToReadyArray(name)
    } else if (name.slice(-1) === id && !isReady) {
      input.current.checked = false
      removeFromReadyArray(name)
    }
  }

  useEffect(() => {
    socket.on("isReady", ({ name, isReady }) => {
      handleReadyStatus(name, isReady)
    })
  }, [socket])



        useEffect(()=>{
    if (whoIsReady.length ===2){
      input.current.disabled = "disabled"
      
    }
  })
      
    


  return (
    <div className={styles.playerCheckboxContainer}>
      <div className={styles.labelContainer}>
        <label for={`Player${id}`}>
          {id === "1" ? "Player 1" : "Player 2"}
        </label>
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id={`Player${id}`}
          ref={input}
          onClick={() => sendReadyStatus(input)}
          disabled={player.name.slice(-1) !== id ? "disabled" : ""}
        />
      </div>
    </div>
  )
}

export default Multiplayer
