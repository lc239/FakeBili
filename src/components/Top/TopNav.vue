<script setup>
    import TopLeftNav from '@/components/Top/TopLeftNav.vue'
    import TopCenterNav from '@/components/Top/TopCenterNav.vue'
    import TopRightNav from '@/components/Top/TopRightNav.vue'
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
        max-width: 2560px;
        padding: 0 24px;
        color: var(--text2);
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
    /* 左导航处的弹一下动画 */
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
</style>