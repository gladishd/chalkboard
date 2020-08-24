module.exports = io => {
  const one = io.of('/1')
  const two = io.of('/2')
  const three = io.of('/3')
  const four = io.of('/4')
  const five = io.of('/5')
  const six = io.of('/6')
  const seven = io.of('/7')

  io.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', name => {
      memory[socket.id] = name
      console.log('mem ', memory)
      io.emit('roster', memory)
    })
    socket.on('message', messageName => {
      socket.broadcast.emit('theirMessage', `${messageName.firstName}: ${messageName.message}`)
      socket.emit('myMessage', `me: ${messageName.message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
  one.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', name => {
      memory[socket.id] = name
      console.log('mem ', memory)
      io.emit('roster', memory)
    })
    socket.on('message', messageName => {
      socket.broadcast.emit('theirMessage', `${messageName.firstName}: ${messageName.message}`)
      socket.emit('myMessage', `me: ${messageName.message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
  

  two.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('socket nsp ', socket.nsp.name)
    socket.on('login', nameType => {
      console.log('ntype ', nameType.type)
      memory[socket.id] = nameType.name
      socket.join(nameType.type)
      io.emit('roster', memory)
    })
    socket.on('message', messageName => {
      socket.broadcast.emit('theirMessage', `${messageName.firstName}: ${messageName.message}`)
      socket.emit('myMessage', `me: ${messageName.message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
  three.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', nameType => {
      console.log('ntype ', nameType.type)
      memory[socket.id] = nameType.name
      socket.join(nameType.type)
      io.emit('roster', memory)
    })
    socket.on('message', messageName => {
      socket.broadcast.emit('theirMessage', `${messageName.firstName}: ${messageName.message}`)
      socket.emit('myMessage', `me: ${messageName.message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
  four.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', name => {
      memory[socket.id] = name
      console.log('mem ', memory)
      io.emit('roster', memory)
    })
    socket.on('message', messageName => {
      socket.broadcast.emit('theirMessage', `${messageName.firstName}: ${messageName.message}`)
      socket.emit('myMessage', `me: ${messageName.message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
  five.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', name => {
      memory[socket.id] = name
      console.log('mem ', memory)
      io.emit('roster', memory)
    })
    socket.on('message', messageName => {
      socket.broadcast.emit('theirMessage', `${messageName.firstName}: ${messageName.message}`)
      socket.emit('myMessage', `me: ${messageName.message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
  six.on('connection', socket => {
    const memory = {}
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', name => {
      memory[socket.id] = name
      console.log('mem ', memory)
      io.emit('roster', memory)
    })
    socket.on('message', messageName => {
      socket.broadcast.emit('theirMessage', `${messageName.firstName}: ${messageName.message}`)
      socket.emit('myMessage', `me: ${messageName.message}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
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
