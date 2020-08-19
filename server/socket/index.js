

module.exports = io => {

  io.on('connection', socket => {
    
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    
    socket.on('login', (name) => {
      memory[socket.id] = name
      console.log('mem ', memory)
      io.emit('roster', memory)
    })
    socket.on('message', (message) => {
      io.emit('message', message)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
