module.exports = io => {
  const one = io.of('/1')
  const two = io.of('/2')
  const three = io.of('/3')
  const four = io.of('/4')
  const five = io.of('/5')
  const six = io.of('/6')
  const seven = io.of('/7')
  let nsp = null

  io.on('connection', socket => {
    console.log('in connection')
    socket.on('class', (name) => {
      console.log('socket nsp ', socket.nsp.name)
      nsp = name
      console.log('name param', name)
      console.log('var name ', nsp)
    })
    socket.on('disconnect', () => {
      console.log('a socket has left the station')
    })
  })
  io.of(nsp).on('connection', (socket) => {
      const memory = {}
      console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('login', nameType => {
      memory[socket.id] = nameType.name
      socket.join(nameType.type)
      socket.to('teacher').emit('list', `${nameType.name}`)
      io.emit('roster', memory)
    })
    socket.on('message', messageNameType => {
      const { message, firstName, type } = messageNameType
      if(type === 'teacher'){
        io.emit('teacherMessage', `Teacher ${firstName}: ${message}`)
        socket.broadcast.emit('teacherMessage',`Teacher ${firstName}: ${message}`)
      } else {
      socket.broadcast.emit(
        'theirMessage',
        `${firstName}: ${message}`
      )
      socket.emit('myMessage', `me: ${message}`)
      }
    })
    socket.on('teacher-chat', (messagefirstName) => {
      const {message, firstName} = messagefirstName
      socket.to('teacher').emit('private', `(Private) ${firstName}: ${message}`)
      socket.emit('myMessage', `(Private) Me: ${message}`)
  })

  // io.on('connection', socket => {
  //   const memory = {}
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)

  //   socket.on('login', nameType => {
  //     memory[socket.id] = nameType.name
  //     socket.join(nameType.type)
  //     socket.to('teacher').emit('list', `${nameType.name}`)
  //     io.emit('roster', memory)
  //   })
  //   socket.on('message', messageNameType => {
  //     const { message, firstName, type } = messageNameType
  //     if(type === 'teacher'){
  //       io.emit('teacherMessage', `Teacher ${firstName}: ${message}`)
  //       socket.broadcast.emit('teacherMessage',`Teacher ${firstName}: ${message}`)
  //     } else {
  //     socket.broadcast.emit(
  //       'theirMessage',
  //       `${firstName}: ${message}`
  //     )
  //     socket.emit('myMessage', `me: ${message}`)
  //     }
  //   })
  //   socket.on('teacher-chat', (messagefirstName) => {
  //     const {message, firstName} = messagefirstName
  //     socket.to('teacher').emit('private', `(Private) ${firstName}: ${message}`)
  //     socket.emit('myMessage', `(Private) Me: ${message}`)
      
  //   })
  
  //   })
  // one.on('connection', socket => {
  //   const memory = {}
  //   console.log(`A socket connection to the server has been made: ${socket.id}`)

  //   socket.on('login', nameType => {
  //     memory[socket.id] = nameType.name
  //     socket.join(nameType.type)
  //     socket.to('teacher').emit('list', `${nameType.name}`)
  //     io.emit('roster', memory)
  //   })
  //   socket.on('message', messageNameType => {
  //     const { message, firstName, type } = messageNameType
  //     if(type === 'teacher'){
  //       one.emit('teacherMessage', `Teacher ${firstName}: ${message}`)
  //       socket.broadcast.emit('teacherMessage',`Teacher ${firstName}: ${message}`)
  //     } else {
  //     socket.broadcast.emit(
  //       'theirMessage',
  //       `${firstName}: ${message}`
  //     )
  //     socket.emit('myMessage', `me: ${message}`)
  //     }
  //   })
  //   socket.on('teacher-chat', (messagefirstName) => {
  //     const {message, firstName} = messagefirstName
  //     socket.to('teacher').emit('private', `(Private) ${firstName}: ${message}`)
  //     socket.emit('myMessage', `(Private) Me: ${message}`)
  //   })

  //   socket.on('disconnect', () => {
  //     console.log(`Connection ${socket.id} has left the building`)
  //   })
  // })

  
  
