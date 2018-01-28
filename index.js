
const swipeDirective = {
  bind: function ($el, binding) {
    // any , horizonal, vertical, right, left, up, down
    // modifiers: lock
    var argument = [
      'any',
      'horizonal',
      'vertical',
      'right',
      'left',
      'up',
      'down'
    ]

    var lock = binding.modifiers.lock
    var processor = binding.value
    var startX
    var startY
    var movingX
    var movingY
    var directionFour
    var directionTwo
    var offset
    var directionCheckDone
    var continuePropagation

    function getInfo (srcEvt) {
      return {
        element: $el,
        scrEvt: srcEvt,
        offset: offset,
        startX: startX,
        startY: startY,
        movingX: movingX,
        movingY: movingY,
        directionTwo: directionTwo,
        directionFour: directionFour,
      }
    }

    // offset的含义由directionTwo来确定的

    if (argument.includes(binding.arg)) {
      $el.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
        directionTwo = null
        directionCheckDone = null
        continuePropagation = false
      })

      $el.addEventListener('touchmove', function (e) {
        movingX = e.touches[0].clientX
        movingY = e.touches[0].clientY

        var x = movingX - startX
        var y = movingY - startY
        var lockCheck = false
        var check

        (directionTwo == null || binding.arg === 'any') && (
          directionTwo = (Math.abs(y) <= Math.abs(x)) ? 'horizonal' : 'vertical'
        )

        if (directionTwo === 'vertical') {
          offset = y
          directionFour = (y < 0) ? 'up' : 'down'
        } else {
          offset = x
          directionFour = (x > 0) ? 'right' : 'left'
        }

        check = [directionFour, directionTwo].includes(binding.arg) || binding.arg === 'any'

        if (directionCheckDone === null) {
          check === true &&
          processor.start instanceof Function && (
            processor.start(getInfo(e), (setTo) => {
              lockCheck = setTo
            }, (setTo) => {
              continuePropagation = setTo
            })
          )

          directionCheckDone = check
        }

        if (directionCheckDone) {
          lock && (lockCheck = true)

          processor.move instanceof Function && (
            processor.move(getInfo(e), (setTo) => {
                lockCheck = setTo
              }, (setTo) => {
                continuePropagation = setTo
              })
          )
          !continuePropagation && e.stopPropagation()
          lockCheck && e.preventDefault()
        }
      })

      $el.addEventListener('touchend', function (e) {
        var lockCheck = false
        continuePropagation = true
        lock && directionCheckDone && (lockCheck = true)

        directionCheckDone && processor.end instanceof Function && (
          processor.end(getInfo(e), (setTo) => {
              lockCheck = setTo
            }, (setTo) => {
              continuePropagation = setTo
            }
          )
        )
        !continuePropagation && e.stopPropagation()
        lockCheck && e.preventDefault()
      })
    } else {
      console.log(`未知自定义swipe位置参数:${binding.argument}`)
    }
  }
}

export default swipeDirective
export { swipeDirective }
