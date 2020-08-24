module.exports = io => {
  io.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', name => {
      memory[socket.id] = name
      console.log('mem ', memory)
      io.emit('roster', memory)
    })
    socket.on('message', message => {
      socket.broadcast.emit('theirMessage', `user: ${message}`)
      socket.emit('myMessage', `me: ${message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })

  const two = io.of('/2')

  two.on('connection', socket => {
    socket.emit('message', 'two two')
  })
}
