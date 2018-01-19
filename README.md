
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
        onSwipe:     (info, prevantDefault, stopPropagation) => console.log(info),
        onSwipeDone: (info, prevantDefault, stopPropagation) => console.log(info)
      }
    },

    directives: {
      // 指令名字可自定义
      swipe: swipeDirective
    }
  }
</script>

<style scoped lang="scss">
</style>

```

## License

MIT 一起来扣细节~