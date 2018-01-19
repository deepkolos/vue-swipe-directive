
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

    function getInfo () {
      return {
        element: $el,
        offset: offset,
        directionFour: directionFour,
        directionTwo: directionTwo,
        movingX: movingX,
        movingY: movingY,
        startX: startX,
        startY: startY
      }
    }

    function setDefault (value, defaultValue) {
      if (value === null || value === undefined) {
        return defaultValue
      }
      return value
    }
    // offset的含义由directionTwo来确定的

    if (argument.includes(binding.arg)) {
      $el.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
        directionCheckDone = null
        directionTwo = null
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

        directionCheckDone === null && (
          directionCheckDone = check
        )

        if (directionCheckDone) {
          lock && (lockCheck = true)

          processor.onSwipe instanceof Function && (
            continuePropagation = setDefault(
              processor.onSwipe(getInfo(), () => {
                lockCheck = true
              }, () => {
                e.stopPropagation()
              }, () => {
                lockCheck = false
              }), false
            )
          )
          !continuePropagation && e.stopPropagation()
          lockCheck && e.preventDefault()
        }
      })

      $el.addEventListener('touchend', function (e) {
        continuePropagation = true
        lock && directionCheckDone && e.preventDefault()

        directionCheckDone && processor.onSwipeDone instanceof Function && (
          continuePropagation = setDefault(
            processor.onSwipeDone(getInfo(), () => {
              e.preventDefault()
            }, () => {
              e.stopPropagation()
            }), true
          )
        )
        !continuePropagation && e.stopPropagation()
      })
    } else {
      console.log(`未知自定义swipe位置参数:${binding.argument}`)
    }
  }
}

export default swipeDirective
export { swipeDirective }
