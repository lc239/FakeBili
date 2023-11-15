<script setup>
    import TopLeftNav from '@/components/Top/TopLeftNav.vue'
    import TopCenterNav from '@/components/Top/TopCenterNav.vue'
    import TopRightNav from '@/components/Top/TopRightNav.vue'
    import { onMounted, ref } from 'vue';

    const topNav = ref(null)
    const slideDown = ref(false)
    onMounted(() => {
        //检查父节点即headerbanner在视口的可见度，75可见时让顶部导航切换类
        const observer = new IntersectionObserver((e) => {
            slideDown.value = !e[0].isIntersecting
            // if(!e[0].isIntersecting){
            //     topNav.value.classList.add('slide-down')
            //     slideDown.value = true
            // }else{
            //     topNav.value.classList.remove('slide-down')
            //     slideDown.value = false
            // }
        }, {threshold: 0.6})
        observer.observe(topNav.value.parentNode)
    })
</script>

<template>
    <div ref="topNav" class="top-nav" :class="{'slide-down':slideDown}">
        <TopLeftNav :slideDown="slideDown"></TopLeftNav>
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
        justify-content: space-between;
    }
    .top-nav.slide-down{
        position: fixed;
        background-color: white;
        box-shadow: inset 0 -1px 0 var(--Ga2)
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