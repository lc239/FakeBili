<script setup>
    import TopLeftNav from '@/components/Top/TopLeftNav.vue'
    import TopCenterNav from '@/components/Top/TopCenterNav.vue'
    import TopRightNav from '@/components/Top/TopRightNav.vue'
    import HeaderChannelFixed from '../HeaderChannelFixed.vue'
    import { useHeaderChannelStore } from '../../stores/header-channel';
    import { storeToRefs } from 'pinia'

    defineProps({
        slideDown: Boolean
    })
    const { headerChannelVisible } = storeToRefs(useHeaderChannelStore())

</script>

<template>
    <div ref="topNav" class="top-nav" :class="{'slide-down': slideDown}">
        <TopLeftNav :slideDown="slideDown"></TopLeftNav>
        <TopCenterNav></TopCenterNav>
        <TopRightNav></TopRightNav>
        <!-- 因为紧贴在topNav下方,所以放在这里 -->
        <Transition name="fadeforward">
        <HeaderChannelFixed v-show="!headerChannelVisible"></HeaderChannelFixed>
    </Transition>
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
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .top-nav.slide-down{
        position: fixed;
        /* 用来改变子元素fixed的参照物 */
        transform: translate(0);
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