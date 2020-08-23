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

  const videoroom = io.of('/video')

  const rooms = {}
  videoroom.on('connect', socket => {
    socket.on('join room', roomID => {
      if (rooms[roomID]) {
        rooms[roomID].push(socket.id)
      } else {
        rooms[roomID] = [socket.id]
      }

      const otherUser = rooms[roomID].find(id => id !== socket.id)
      if (otherUser) {
        socket.emit('other user', otherUser)
        socket.to(otherUser).emit('user joined', socket.id)
      }

      socket.on('offer', payload => {
        videoroom.to(payload.target).emit('offer', payload)
      })

      socket.on('answer', payload => {
        videoroom.to(payload.target).emit('answer', payload)
      })

      socket.on('ice-candidate', incoming => {
        videoroom.to(incoming.target).emit('ice-candidate', incoming.candidate)
      })
    })
  })
}
