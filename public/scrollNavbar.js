setTimeout(console.log('Loading...'), 1000)

let header = document.getElementsByClassName('navbar-header')[0]
console.log(header)

let someDiv = document.querySelector('div')

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset
  if (currentScroll == 0) {
    console.log('scrolling')
    return
  }
  console.log('event listening')
  header = document.getElementsByClassName('navbar-header')[0]
  const scrollPosition = window.scrollY
  if (scrollPosition > 0) {
    console.log('did they scroll')
    header.classList.add('noStickyLogo')
  } else {
    console.log('did they scroll')
    header.classList.remove('noStickyLogo')
  }
})
