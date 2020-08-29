module.exports = io => {
  console.log('dir to sockets')

  const room = {}
  io.on('connection', socket => {
    socket.on('login', user => {
      const {course, level, name} = user
      socket.join(course)
      room[socket.id] = course
      room[name] = socket.id
      socket.join(level)
    })

    socket.on('student-public-message', messageName => {
      console.log('room check ', room[socket.id])
      const {message, name} = messageName

      socket.to(room[socket.id]).emit('message', {
        message: `${name}: ${message}`,
        type: 'student',
        css: 'student-public'
      })
      socket.emit('message', {
        message: `Me: ${message}`,
        type: 'student',
        css: 'student-public'
      })
    })
    socket.on('teacher-public-message', messageName => {
      console.log('room check ', room[socket.id])
      const {message, name} = messageName

      socket.to(room[socket.id]).emit('message', {
        message: `${name}: ${message}`,
        type: 'teacher',
        css: 'teacher-public'
      })
      socket.emit('message', {
        message: `Me: ${message}`,
        type: 'teacher',
        css: 'teacher-public'
      })
    })
    socket.on('student-teacher-message', (messageName) => {
   
      const { message, name } = messageName
      
      socket.in(room[socket.id]).to('teacher').emit('private-message',{
        message: `(Private) ${name}: ${message}`,
        type: 'student',
        user: socket.id,
        css: 'student-teacher'
      })
      
      socket.emit('message', {
        message: `(Private) Me: ${message}`,
        type: 'student',
        css: 'student-teacher'
      })
      
    })
    
    socket.on('direct-message', (MessageNameTo) => {
      const { message, name, to, level } = MessageNameTo
      const student = room[to]
      console.log('dm student is ', student)
      io.in(room[socket.id]).to(student).emit('message', {
        message: `(Direct) ${name}: ${message}`,
        type: level,
        name,
        css: 'teacher-dm'
      })
      // socket.emit('message', {
      //   message: `(DM) ${to}: ${message}`,
      //   type: level,
      //   name,
      //   css: 'teacher-dm'
      // })
      
    })
    socket.on('disconnect', () => {
      console.log('a socket has left the station')
    })
  })
}
