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
function useFade(el){
    const inArea = ref(false)
    onMounted(() => {
        el.value.addEventListener('mouseenter', () => inArea.value = true)
        el.value.addEventListener('mouseleave', e => {
            if(!el.value.contains(e.relatedTarget)){
                inArea.value = false
            }
        })
    })
    return inArea
}
function useFadeArr(elArr){
    const inArr = ref([])
    onMounted(() => {
        elArr.value.forEach((el, i) => {
            el.addEventListener('mouseenter', () => inArr.value[i] = true)
            el.addEventListener('mouseleave', e => {
                if(!el.contains(e.relatedTarget)){
                    inArr.value[i] = false
                }
            })
        })
    })
    return inArr
}

export {useFollow, useFade, useFadeArr}