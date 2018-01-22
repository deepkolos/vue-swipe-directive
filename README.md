
## vue-swipe-directive

### 使用

```vue
<template>
  <div v-swipe:vertical="swipeConfig"></div>
</template>

<script>
  import { swipeDirective } from '../../mixins/event/swipe.js'

  export default {
    mounted () {
      this.swipeConfig = {
        onSwipe:     (info, lock, propagation) => console.log(info),
        onSwipeDone: (info, lock, propagation) => console.log(info)
      }
    },

    directives: {
      // 指令名字可自定义
      swipe: swipeDirective
    }
  }
</script>
```

### 参数解析

```javascript
var info = {
      scrEvt: Event,
      offset: Number,
      startY: Number,
      startX: Number,
      movingX: Number,
      movingY: Number,
      element: HTMLElement,
      directionTwo: String,  // horizonal, vertical
      directionFour: String, // right, left, up, down
    };

var lock        = Function(Boolean); // lock(true/false)        是否执行preventDefault
var propagation = Function(Boolean); // propagation(true/false) 是否执行stopPropagation

```

## License

MIT 一起来扣细节~