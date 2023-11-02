import { defineStore } from "pinia"
import { ref } from 'vue'

export const useUserStore = defineStore('user',() => {
    const token = ref(null)
    const refreshToken = ref(null)
    function exitLogin(){
        token.value = null
        refreshToken.value = null
    }
    const uid = ref(0)
    const uname = ref('')
    const coin = ref('0')
    const bCoin = ref(0)
    const level = ref(0)
    const follower = ref(0)
    const following = ref(0)
    const dynamicCount = ref(0)
    return {token, refreshToken, exitLogin, uid, uname, coin, bCoin, level, follower, following, dynamicCount}
},{
    persist: {
        key: 'token',
        storage: localStorage,
        paths: ['token', 'refreshToken']
    }
})