<script setup>
    import HeaderBanner from '@/components/HeaderBanner.vue'
    import HeaderChannel from '@/components/HeaderChannel.vue'
    import RecommendMain from '@/components/RecommendMain.vue'
    import LoginPanel from '@/components/LoginPanel.vue'
    import { provide, ref } from 'vue'
    import instance from './conf/axios-instance'
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'

    const {token, uid, uname, coin, bCoin, level, follower, following, dynamicCount} = storeToRefs(useUserStore())

    const reqLogin = ref(false)
    const loginOrRegister = ref(true)
    function openLoginOrRegisterPanel(login = true){
        reqLogin.value = true
        loginOrRegister.value = login
    }
    function queryBasic(){
        instance.post('/query/basic').then(res => {
            uid.value = res.data.uid
            uname.value = res.data.uname
            coin.value = res.data.coin
            bCoin.value = res.data.bCoin
            level.value = res.data.level
            follower.value = res.data.follower
            following.value = res.data.following
            dynamicCount.value = res.data.dynamicCount
        })
    }
    if(token.value) queryBasic()
    provide('openLoginOrRegisterPanel', openLoginOrRegisterPanel)
    provide('queryBasic', queryBasic)
</script>

<template>
    <div id="bili">
        <HeaderBanner></HeaderBanner>
        <HeaderChannel></HeaderChannel>
        <RecommendMain></RecommendMain>
    </div>
    <Transition name="mask">
        <div v-if="reqLogin" id="bili-mask">
            <LoginPanel :login="loginOrRegister" @close="reqLogin = false"></LoginPanel>
        </div>
    </Transition>
</template>

<style>
    #bili{
        max-width: 2560px;
        margin: 0 auto;
    }
    #bili-mask{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1000;
        top: 0;
        background: rgba(0,0,0,.5);
        display: flex;
        align-items: center;
        justify-content: center;;
    }
    .pop-shell{
        position: absolute;
        transition: all .3s;
        z-index: 1000;
    }
    .fadedown-enter-from,.fadedown-leave-to{
        opacity: 0;
        transform: translateY(-10px);
    }
    .fadedown-enter-active,.fadedown-leave-active{
        transition: all .3s;
    }
    .fadedown-leave-active{
        pointer-events: none;
    }
    .fadedown-enter-to,.fadedown-leave-from{
        opacity: 1;
    }
    .fadeup-enter-from,.fadeup-leave-to{
        opacity: 0;
        transform: translateY(-10px);
    }
    .fadeup-enter-active,.fadeup-leave-active{
        transition: all .3s;
    }
    .fadeup-leave-active{
        pointer-events: none;
    }
    .fadeup-enter-to,.fadeup-leave-from{
        opacity: 1;
    }
    .faderight-enter-from,.faderight-leave-to{
        opacity: 0;
        transform: translateX(-10px);
    }
    .faderight-enter-active,.faderight-leave-active{
        transition: all .3s;
    }
    .faderight-leave-active{
        pointer-events: none;
    }
    .faderight-enter-to,.faderight-leave-from{
        opacity: 1;
    }
    .mask-enter-from,.mask-leave-to{
        opacity: 0;
    }
    .mask-enter-active,.mask-leave-active{
        transition: all .3s;
    }
    .mask-enter-to,.mask-leave-from{
        opacity: 1;
    }
</style>