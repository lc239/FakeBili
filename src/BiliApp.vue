<script setup>
    import HeaderBanner from '@/components/HeaderBanner.vue';
    import HeaderChannel from '@/components/HeaderChannel.vue'
    import LoginPanel from './components/LoginPanel.vue';
    import { provide, ref } from 'vue';

    const reqLogin = ref(false)
    const loginOrRegister = ref(true)
    function openLoginOrRegisterPanel(login = true){
        reqLogin.value = true
        loginOrRegister.value = login
    }
    provide('openLoginOrRegisterPanel', openLoginOrRegisterPanel)
</script>

<template>
    <div id="bili">
        <HeaderBanner></HeaderBanner>
        <HeaderChannel></HeaderChannel>
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
    .fadedown-enter-from,.fadedown-leave-to{
        opacity: 0;
        transform: translateY(-10px);
    }
    .fadedown-enter-active,.fadedown-leave-active{
        transition: all .3s;
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
    .fadeup-enter-to,.fadeup-leave-from{
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