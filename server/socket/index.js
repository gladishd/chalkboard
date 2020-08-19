module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    
    socket.on('message', (message) => {
      io.emit('message', message)
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

