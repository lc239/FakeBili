<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import { Navigation, Pagination } from 'swiper/modules'
    import { useGenID } from '@/js/utils'
    import 'swiper/css'
    import 'swiper/css/navigation'
    import 'swiper/css/pagination'
    import { onMounted, ref } from 'vue'
    import CommonCard from './Recommend/CommonCard.vue'

    const swiperTitle = ref(null)
    const swiperTitles = ['天使or恶魔', '什么，我的数字居然是', '史上最可爱“红娘”！海龟驮着两只螃蟹谈恋爱', '投稿瓜分万元现金！', '来画蔚蓝档案吧！', '上B站看围棋 男子围甲第五轮开启']
    const swiperImgs = useGenID([{href: '', img: '/assets/recommend/swiper/1.jpg'}, {href: '', img: '/assets/recommend/swiper/2.jpg'}, {href: '', img: '/assets/recommend/swiper/3.png'},
        {href: '', img: '/assets/recommend/swiper/4.jpg'}, {href: '', img: '/assets/recommend/swiper/5.jpg'}, {href: '', img: '/assets/recommend/swiper/6.jpg'}])

    const recommend10 = useGenID([
        {name:'枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶枫叶', cover: '/assets/cover/1.png', playCount: 230000000, thumbCount: 12, bulletCount: 2, duration: '00:20', uploaderName: '名字',
        uploadDate: '11-9', path: '/assets/video/pre/1.mpd'},
        {name:'云云云', cover: '/assets/cover/2.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/2.mpd'},
        {name:'山水画', cover: '/assets/cover/3.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/3.mpd'},
        {name:'动画混剪', cover: '/assets/cover/4.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/4.mpd'},
        {name:'薇尔莉特', cover: '/assets/cover/5.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/5.mpd'},
        {name:'航拍', cover: '/assets/cover/6.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/6.mpd'},
        {name:'祈りの歌', cover: '/assets/cover/7.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/7.mpd'},
        {name:'エガオノキミえ', cover: '/assets/cover/8.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/8.mpd'},
        {name:'Aurora Days', cover: '/assets/cover/9.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/9.mpd'},
        {name:'Aurora Days(友奈)', cover: '/assets/cover/10.png', playCount: 12345, thumbCount: 12000, bulletCount: 2, duration: '00:07', uploaderName: '名字2', uploadDate: '11-9',
        path: '/assets/video/pre/10.mpd'}
    ])

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
        <CommonCard v-for="item in recommend10" :key="item.id" v-bind="item"></CommonCard>
    </div>
</template>

<style>
    .recommend-main{
        --grid-gap: 20px;
        --visual-cover-radio: 66.7%;
        --visual-cover-radio-number: 0.667;
        --card-height: 230px;
        padding: 0 140px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: var(--card-height);
        gap: var(--grid-gap);
    }
    .recommend-main .recommend-swiper{
        --swiper-navigation-size: 14px;
        --swiper-pagination-bullet-inactive-color: white;
        --swiper-pagination-bullet-inactive-opacity: .4;
        --swiper-pagination-color: transparent;
    }
    .recommend-main .recommend-swiper .swiper{
        height: calc(var(--card-height) * (1 + var(--visual-cover-radio-number)) + var(--grid-gap));
        border-radius: 6px;
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