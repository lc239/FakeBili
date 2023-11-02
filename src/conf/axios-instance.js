import axios from "axios"
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

instance.interceptors.request.use(config => {
    const {token} = storeToRefs(useUserStore())
    if(token.value){
        config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
})
instance.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response){
        //token失效
        if(error.response.status === 401){
            const {token, refreshToken} = storeToRefs(useUserStore())
            if(token.value){
                const p = instance.post('/token', null, {headers:{
                    Authorization: `Bearer ${refreshToken.value}`
                }}).then(res => {
                    if(res.status === 200){
                        token.value = res.data.token
                        refreshToken.value = res.data.refreshToken
                        const config = error.request.config
                        config.headers.Authorization = `Bearer ${token.value}`//使用新token再次请求
                        return instance.post(error.request.config.url, error.request.data, config)
                    }
                })
                const { exitLogin } = useUserStore()
                exitLogin()
                return p
            }
            else{
                return Promise.reject(error)
            }
        }
    }
})

export default instance