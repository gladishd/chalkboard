module.exports = io => {
  console.log('dir to sockets')

  const room = {}
  io.on('connection', socket => {
    socket.on('login', user => {
      const {course, level} = user
      socket.join(course)
      room[socket.id] = course
      socket.join(level)
    })

    socket.on('student-public-message', messageName => {
      console.log('in spm')
      const {message, name} = messageName

      socket.to(room[socket.id]).emit('message', {
        message: `${name}: ${message}`,
        type: 'student'
      })
      socket.emit('message', {
        message: `Me: ${message}`,
        type: 'student'
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
