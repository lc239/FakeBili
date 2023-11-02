import { ref, onMounted } from 'vue'

function useFollow(el) {
    const xobj = ref({startX:0,x:0})
  
    function update(event) {
        xobj.value.x = event.pageX
    }

    function start(event){
        xobj.value.startX = event.pageX
        xobj.value.x = event.pageX
    }

    function end(){
        xobj.value.x = 0
        xobj.value.startX = 0
    }

    onMounted(() => el.value.addEventListener('mouseenter',start))
    onMounted(() => el.value.addEventListener('mousemove', update))
    onMounted(() => el.value.addEventListener('mouseleave',end))
    // onUnmounted(() => el.removeEventListener('mouseenter',start))
    // onUnmounted(() => el.removeEventListener('mousemove', update))
    // onUnmounted(() => el.removeEventListener('mouseleave',end))
  
    return xobj
}
//目标对象中的in:boolean表示鼠标是否在元素区域内
function useAreaIn(el, inArea, delay){
    if(!el){
        inArea.in = false
        return
    }
    //:ref会被莫名其妙调用,比如s13动画会导致旁边的模板引用调用函数而且不会传一次null,用户面板的推荐服务鼠标进出也会调用,所以在有问题的地方我使用了ref加watch的形式防止添加一样的事件
    let timer
    el.addEventListener('mouseenter', () => timer = setTimeout(() => inArea.in = true, delay))
    el.addEventListener('mouseleave', e => {
        if(!el.contains(e.relatedTarget)){
            clearTimeout(timer)
            inArea.in = false
        }
    })
}

export {useFollow, useAreaIn}