import { defineStore } from "pinia"
import { ref } from 'vue'

export const useHistoryStore = defineStore('index-history',() => {
    const history = ref([])
    function clearHistory(item){
        if(item === null) history.value = []
        else{
            const i = history.value.findIndex(v => v === item)
            history.value.splice(i, 1)
        }
    }
    return {history, clearHistory}
},{
    persist:true
})