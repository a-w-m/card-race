//join multiplayer room

function joinRoom(socket, room){
    socket.emit('join',  room)
}

//create multiplayer room
function createRoom(socket, room){
    socket.emit('create')
}

function newMatch (socket, numberOfMatches){
    socket.emit('match', numberOfMatches)
}