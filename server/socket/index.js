module.exports = io => {


  const room = {}
  io.on('connection', socket => {

    console.log('in public')
    
    socket.on('course', (name) => {
      socket.join(name)
      room[socket.id] = name
      console.log('in course ', room[socket.id])

      socket.to(room[socket.id]).emit('room-chat', 'with love')
      socket.emit('room-chat', 'solo')
    })
    socket.on('message', (message) => {
      socket.to(room[socket.id]).emit('message', {
        message: `${message.firstName}: ${message.message}`,
        type: message.type,
        person: 'other'
      })
      socket.emit('message', {
        message: `${message.firstName}: ${message.message}`,
        type: message.type,
        person: 'self'
      })
    })
    socket.on('disconnect', () => {
      console.log('a socket has left the station')
    })
  })
}
//   io.of(nsp).on('connection', (socket) => {
//     console.log('in private')
//       socket.emit('send-nsp', 'from server to client')
//       const memory = {}
//       console.log(`A socket connection to the server has been made: ${socket.id}`)

//     socket.on('nsp-test', (message) => {
//       console.log(`In private nsp ${message}`)
//     })
//     socket.on('login', nameType => {
//       memory[socket.id] = nameType.name
//       socket.join(nameType.type)
//       socket.to('teacher').emit('list', `${nameType.name}`)
//       io.emit('roster', memory)
//     })
//     socket.on('message', messageNameType => {
//       const { message, firstName, type } = messageNameType
//       if(type === 'teacher'){
//         io.emit('teacherMessage', `Teacher ${firstName}: ${message}`)
//         socket.broadcast.emit('teacherMessage',`Teacher ${firstName}: ${message}`)
//       } else {
//       socket.broadcast.emit(
//         'theirMessage',
//         `${firstName}: ${message}`
//       )
//       socket.emit('myMessage', `me: ${message}`)
//       }
//     })
//     socket.on('teacher-chat', (messagefirstName) => {
//       const {message, firstName} = messagefirstName
//       socket.to('teacher').emit('private', `(Private) ${firstName}: ${message}`)
//       socket.emit('myMessage', `(Private) Me: ${message}`)
//     })
//   })
// }


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

  
  
