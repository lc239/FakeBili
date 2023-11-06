<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import { Navigation, Pagination } from 'swiper/modules'
    import { useGenID } from '@/js/utils'
    import 'swiper/css'
    import 'swiper/css/navigation'
    import 'swiper/css/pagination'
    import { onMounted, ref } from 'vue'

    const swiperTitle = ref(null)
    const swiperTitles = ['天使or恶魔', '什么，我的数字居然是', '史上最可爱“红娘”！海龟驮着两只螃蟹谈恋爱', '投稿瓜分万元现金！', '来画蔚蓝档案吧！', '上B站看围棋 男子围甲第五轮开启']
    const swiperImgs = useGenID([{href: '', img: '/assets/recommend/swiper/1.jpg'}, {href: '', img: '/assets/recommend/swiper/2.jpg'}, {href: '', img: '/assets/recommend/swiper/3.png'},
        {href: '', img: '/assets/recommend/swiper/4.jpg'}, {href: '', img: '/assets/recommend/swiper/5.jpg'}, {href: '', img: '/assets/recommend/swiper/6.jpg'}])

    let nextSwiperSlideBtn
    function onSwiper(s){
        nextSwiperSlideBtn = s.navigation.nextEl
    }
    function onPaginationUpdate(s){
        swiperTitle.value.innerText = swiperTitles[s.realIndex]
        const diff = s.realIndex - s.previousRealIndex
        if(diff > 0){
            s.pagination.bullets[s.realIndex].classList.remove('from-right')
            s.pagination.bullets[s.realIndex].classList.add('from-left')
        }else if(diff < 0){
            s.pagination.bullets[s.realIndex].classList.remove('from-left')
            s.pagination.bullets[s.realIndex].classList.add('from-right')
        }
    }
    //在分页器后触发
    function onNavigationNext(s){
        s.pagination.bullets[s.realIndex].classList.remove('from-right')
        s.pagination.bullets[s.realIndex].classList.add('from-left')
    }
    function onNavigationPrev(s){
        s.pagination.bullets[s.realIndex].classList.remove('from-left')
        s.pagination.bullets[s.realIndex].classList.add('from-right')
    }
    let swiperTimer
    //定时改变swiper
    function setSwiperTimer(){
        swiperTimer = setInterval(() => {
            nextSwiperSlideBtn.click()
        }, 3000)
    }
    function clearSwiperTimer(){
        clearInterval(swiperTimer)
    }
    onMounted(() => {
        setSwiperTimer()
    })
</script>

<template>
    <div class="recommend-main">
        <div class="recommend-swiper" @mouseenter="clearSwiperTimer" @mouseleave="setSwiperTimer">
            <Swiper loop :modules="[Navigation, Pagination]" navigation :pagination="{clickable: true}" slides-per-view="1" space-between="50" @pagination-update="onPaginationUpdate" @navigation-next="onNavigationNext" @navigation-prev="onNavigationPrev" @swiper="onSwiper">
                <SwiperSlide v-for="item in swiperImgs" :key="item.id">
                    <a :href="item.href"><img :src="item.img"></a>
                </SwiperSlide>
                <div ref="swiperTitle" class="title">{{ swiperTitles[0] }}</div>
                <div class="swiper-mask"></div>
            </Swiper>
        </div>
    </div>
</template>

<style>
    .recommend-main{
        padding: 0 140px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
    }
    .recommend-main .recommend-swiper{
        --swiper-navigation-size: 14px;
        --swiper-pagination-bullet-inactive-color: white;
        --swiper-pagination-bullet-inactive-opacity: .4;
        --swiper-pagination-color: transparent;
    }
    .recommend-main .recommend-swiper .swiper{
        height: 400px;
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination{
        width: auto;
        bottom: 16px;
        left: 14px;
        display: flex;
        align-items: center;
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active{
        width: 14px;
        height: 14px;
        position: relative;
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active::before,.swiper-pagination-bullet-active::after{
        content: '';
        display: block;
        position: absolute;
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
    @keyframes rightRotate {
        from{
            rotate: 0deg;
        }
        to{
            rotate: 30deg;
        }
    }
    @keyframes leftRotate {
        from{
            rotate: 0deg;
        }
        to{
            rotate: -30deg;
        }
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active::before{
        background-image: linear-gradient(to top, transparent, transparent 50%, white 50%);
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active::after{
        background-image: linear-gradient(to bottom, transparent, transparent 50%, white 50%);
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active.from-left::before{
        animation: leftRotate .2s 4 alternate;
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active.from-left::after{
        animation: rightRotate .2s 4 alternate;
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active.from-right::before{
        animation: rightRotate .2s 4 alternate;
    }
    .recommend-main .recommend-swiper .swiper .swiper-pagination .swiper-pagination-bullet-active.from-right::after{
        animation: leftRotate .2s 4 alternate;
    }
    .recommend-main .recommend-swiper .swiper-button-prev,.swiper-button-next{
        z-index: 3;
        color: white;
        top: auto;
        bottom: 40px;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, .1);
        cursor: pointer;
    }
    .recommend-main .recommend-swiper .swiper-button-prev::after,.swiper-button-next::after{
        scale: 0.7;
    }
    .recommend-main .recommend-swiper .swiper-button-prev:hover,.swiper-button-next:hover{
        background-color: rgba(255, 255, 255, .2);
    }
    .recommend-main .recommend-swiper .swiper-button-prev{
        left: auto;
        right: 50px;
    }
    .recommend-main .recommend-swiper{
        grid-area: auto / auto / span 2 / span 2;
        overflow: hidden;
        border-radius: 6px;
        position: relative;
    }
    .recommend-main .recommend-swiper img{
        width: 100%;
    }
    .recommend-main .recommend-swiper .swiper-mask{
        position: absolute;
        z-index: 2;
        bottom: 0;
        width: 100%;
        height: 160px;
        background: linear-gradient(0, #2F3238 55%, transparent 100%);
        pointer-events: visible;
    }
    .recommend-main .recommend-swiper .title{
        position: absolute;
        z-index: 3;
        bottom: 40px;
        left: 18px;
        max-width: 80%;
        font-size: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: white;
    }
</style>