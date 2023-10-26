<script setup>
    import { ref, watch } from 'vue';
    import { useGenID } from '../../js/utils';

    const topPicPathPrefix = './src/assets/images/top-pics/'
    const topPicAnimePathPrefix = './src/assets/animes/top-pics/'
    const topPicPathSuffix = '.png@1c.webp'
    //在电脑缩放比150浏览器缩放比100下的图片,视频属性
    const picStatus = useGenID([
        {width: 2167, height: 203, tx: 0, ty: 0},
        {width: 207.484, height: 110.245, tx: 80.5161, ty: 6.19355},
        {width: 64.2581, height:23.7419, tx: -15.4839, ty: 33.5484},
        {width: 779.561, height: 164.335, tx: 825.806, ty: -33.0323},
        {width: 1177.81, height: 175.484,tx: 877.419, ty: -10.3226},
        {width: 128.516, height: 47.4839, tx: 232.258, ty: 30.9677},
        {width: 681.394, height: 167.639, tx: -578.065, ty: 0},
        {width: 154.219, height: 56.9806, tx: -681.29, ty: 24.7742},
        {width: 1512.36, height: 161.135, tx: 0, ty: 0},
        {width: 232.774,height: 90.271, tx: -113.548, ty: 28.3871},
        {width: 198.71, height: 105.806, tx: 361.29, ty: 36.129},
        {width: 450.271, height: 174.039, tx: -433.548, ty: 0},
        {width: 336.671, height: 112.413, tx:-397.419, ty: 22.7097},
        {width: 600.361, height: 232.052, tx: 825.806, ty: 0},
        {width: 460.284, height: 145.239, tx: -144.516, ty: 0},
        {width: 460.284, height: 145.239, tx: 578.065, ty: 0},
    ])
    const vStatus = useGenID([
        {z: 5, width: 1858.06, height: 102.813, tx: 37.1613, ty: 43.3548},
        {z: 19, width:1296.31, height: 138.116, tx: 0, ty: 0}
    ])
    const ratio = ref(devicePixelRatio / 1.5)

    defineProps(['picOffset'])//控制图片的移动

    //图片跟随缩放
    function updateRatio(){
        ratio.value = devicePixelRatio / 1.5
    }
    let tmpMediaQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    watch(ratio,() => {
        const mqString = `(resolution: ${window.devicePixelRatio}dppx)`
        tmpMediaQuery.removeEventListener('change',updateRatio)
        tmpMediaQuery = matchMedia(mqString)
        tmpMediaQuery.addEventListener('change',updateRatio)
    },{immediate: true})

</script>

<template>
    <div class="top-pics" ref="topPics">
        <div class="layer" v-for="item in picStatus" :key="item.id" :style="{zIndex: 2 * item.id, left: $props.picOffset * item.id / 150 + 'px', bottom: item.id === 9 ? $props.picOffset / 250 + 'px' : 0}">
            <img :src="topPicPathPrefix + item.id + topPicPathSuffix" :style="{width: `${item.width / ratio}px`, height: `${item.height / ratio}px`, transform: `translate(${item.tx / ratio}px, ${item.ty / ratio}px)`}">
        </div>
        <div class="layer" v-for="item in vStatus" :key="item.id" :style="{zIndex: item.z}">
            <video loop autoplay :src="`${topPicAnimePathPrefix + item.id}.webm`" :style="{width: `${item.width / ratio}px`, height: `${item.height / ratio}px`, transform: `translate(${item.tx / ratio}px, ${item.ty / ratio}px)`}"></video>
        </div>
    </div>
</template>

<style>
    .top-pics{
        position: relative;
        width: 100%;
        height: 9.375vw;
        min-height: 155px;
        max-height: 240px;
        overflow: hidden;
    }
    .top-pics .layer{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    .top-pics video{
        object-fit: cover;
    }
    .top-pics .layer:nth-child(3) img{
        filter: blur(0.5px);
        opacity: 0.7;
    }
    .top-pics .layer:nth-child(11) img{
        opacity: 0;
    }
    .top-pics .layer:nth-child(12) img{
        opacity: 0;
    }
    .top-pics .layer video:nth-of-type(2){
        opacity: 0.6;
    }
</style>