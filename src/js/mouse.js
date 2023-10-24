import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse(el) {
    const xobj = ref({startX:0,x:0})
  
    function update(event) {
        xobj.value.x = event.pageX
    }

    function start(event){
        xobj.value.startX = event.pageX
    }

    function end(){
        xobj.value.x = 0
        xobj.value.startX = 0
    }

    onMounted(() => el.value.addEventListener('mouseenter',start))
    onMounted(() => el.value.addEventListener('mousemove', update))
    onMounted(() => el.value.addEventListener('mouseleave',end))
    onUnmounted(() => el.removeEventListener('mouseenter',start))
    onUnmounted(() => el.removeEventListener('mousemove', update))
    onUnmounted(() => el.removeEventListener('mouseleave',end))
  
    return xobj
  }