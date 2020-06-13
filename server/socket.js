const { io } = require("./index")

function createRoom() {
  const room = Math.floor(Math.random() * 1000).toString()

  if (doesRoomExist(room)) {
    if (isRoomEmpty(room)) {
      return room
    } else {
      return createRoom()
    }
  } else {
    return room
  }
}

function doesRoomExist(room) {
  return io.sockets.adapter.rooms[room] ? true : false
}

function isRoomEmpty(room) {
  return io.sockets.adapter.rooms[room].length === 0 ? true : false
}

const socketListener = io.on("connect", socket => {
  socket.on("message", message => {
    console.log(message)
  })

  socket.on("create room", data => {
    const roomId = createRoom()
    socket.join(roomId)

    io.to(socket.id).emit("created room", roomId)
  })

  socket.on("join request", data => {
    console.log("request", data)
    console.log(io.sockets.adapter.rooms[data])

    if (
      !io.sockets.adapter.rooms[data] ||
      io.sockets.adapter.rooms[data].length > 1
    ) {
      io.to(socket.id).emit("failed join room", data)
    } else {
      socket.join(data)
      io.to(socket.id).emit("joined room", data)
      socket.broadcast.to(data).emit("player 2 joined room", data)
    }
  })

  socket.on('isReady', ({room, player, isReady})=>{
    console.log(room, player, isReady)
    socket.broadcast.to(room.id).emit('isReady', {name: player.name, isReady})
  })


  

  socket.on("multiplayerMatch", ({matches, room}) => {
    if (matches && room.id){
    socket.broadcast.to(room.id).emit("multiplayerMatch", matches)
    }
  })
})

module.exports = socketListener
