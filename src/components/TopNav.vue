<script setup>
    import TopLeftNav from './TopLeftNav.vue'
    import TopCenterNav from './TopCenterNav.vue'
    import TopRightNav from './TopRightNav.vue'
    import { ref } from 'vue';

    const change = ref(true)
</script>

<template>
    <div ref="topNav" class="top-nav" :class="{'slide-down':change}">
        <TopLeftNav></TopLeftNav>
        <TopCenterNav></TopCenterNav>
        <TopRightNav></TopRightNav>
    </div>
</template>

<style>
    .top-nav{
        height: 64px;
        width: 100%;
        padding: 0 24px;
        color: #18191C;
        position: absolute;
        top: 0;
        z-index: 50;
        display: flex;
        align-items: center;
    }
    .top-nav.slide-down{
        position: fixed;
    }
    .top-nav ul{
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        list-style: none;
    }
    .top-nav ul li{
        height: 100%;
    }
    .top-nav .move{
        position: relative;
    }
    .top-nav a:hover .move{
        animation: nav-move linear 2 0.15s alternate;
    }
    @keyframes nav-move {
        from{
            transform: translateY(0);
        }
        to{
            transform: translateY(-4px);
        }
    }
    .fadeout-enter-from,.fadeout-leave-to{
        opacity: 0;
        transform: translateY(-10px);
    }
    .fadeout-enter-active,.fadeout-leave-active{
        transition: all .4s;
    }
    .fadeout-enter-to,.fadeout-leave-from{
        opacity: 1;
    }
</style>