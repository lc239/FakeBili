<script setup>
    import TopPics from '@/components/Top/TopPics.vue'
    import TopNav from '@/components/Top/TopNav.vue'
    import { useFollow } from '@/js/mouse'
    import { ref, computed, onMounted } from 'vue'
    const headerBanner = ref(null)
    const mouseOffset = useFollow(headerBanner)//读取鼠标相对图片偏移
    const picoffset = computed(() => mouseOffset.value.x - mouseOffset.value.startX)

    const topNavSlideDown = ref(false)
    const topNavObserver = new IntersectionObserver(e => topNavSlideDown.value = !e[0].isIntersecting, {threshold: 0.6})
    onMounted(() => {
        topNavObserver.observe(headerBanner.value)
    })
</script>

<template>
    <div class="header-banner" ref="headerBanner">
        <TopPics :pic-offset="picoffset"></TopPics>
        <div class="logo">
            <a href="https://www.bilibili.com/?spm_id_from=333.1007.0.0">
                <img src="@/assets/images/header/logo.png">
            </a>
        </div>
        <div class="top-shadow"></div>
        <TopNav :slideDown="topNavSlideDown"></TopNav>
    </div>
</template>

<style>
    .header-banner{
        position: relative;
        width: 100%;
        max-width: 2560px;
    }
    .header-banner .logo{
        position: absolute;
        z-index: 40;
        top: 50%;
        left: 96px;
        transform: translateY(-10px);
    }
    .header-banner .logo img{
        width: 162px;
        height: 78px;
    }
    .top-shadow{
        position: absolute;
        z-index: 40;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(rgba(0,0,0,.4),transparent);
    }
</style>