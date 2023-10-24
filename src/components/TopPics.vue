<script setup>
    const topPicPathPrefix = './src/assets/images/top-pics/'
    const topPicAnimePathPrefix = './src/assets/animes/top-pics/'
    const topPicPathSuffix = '.png@1c.webp'

    import TopShadow from './TopShadow.vue';

    defineProps(['picOffset'])//控制图片的移动

</script>

<template>
    <div class="top-pics" ref="topPics">
        <div class="layer" v-for="id in 16" :key="id" :style="{zIndex: 2 * id,left: $props.picOffset * id / 150 + 'px',bottom: id === 9 ? $props.picOffset / 250 + 'px' : 0}">
            <img :src="topPicPathPrefix + id + topPicPathSuffix">
        </div>
        <div class="layer" style="z-index: 5;">
            <video loop autoplay :src="topPicAnimePathPrefix + '1.webm'"></video>
        </div>
        <div class="layer" style="z-index: 19;">
            <video loop autoplay :src="topPicAnimePathPrefix + '2.webm'"></video>
        </div>
        <TopShadow style="z-index: 40;"></TopShadow>
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
    .top-pics .layer:nth-child(1) img{
        width: 2167px;
        height: 203px;
    }
    .top-pics .layer:nth-child(2) img{
        width: 207.484px;
        height: 110.245px;
        transform: translate(80.5161px, 6.19355px);
    }
    .top-pics .layer:nth-child(3) img{
        height: 23.7419px;
        width: 64.2581px;
        transform: translate(-15.4839px, 33.5484px);
        filter: blur(0.5px);
        opacity: 0.7;
    }
    .top-pics .layer:nth-child(4) img{
        height: 164.335px;
        width: 779.561px;
        transform: translate(825.806px, -33.0323px);
    }
    .top-pics .layer:nth-child(5) img{
        height: 175.484px;
        width: 1177.81px;
        transform: translate(877.419px, -10.3226px);
    }
    .top-pics .layer:nth-child(6) img{
        height: 47.4839px;
        width: 128.516px;
        transform: translate(232.258px, 30.9677px);
    }
    .top-pics .layer:nth-child(7) img{
        height: 167.639px;
        width: 681.394px;
        transform: translate(-578.065px);
    }
    .top-pics .layer:nth-child(8) img{
        height: 56.9806px;
        width: 154.219px;
        transform: translate(-681.29px, 24.7742px);
    }
    .top-pics .layer:nth-child(9) img{
        height: 161.135px;
        width: 1512.36px;
    }
    .top-pics .layer:nth-child(10) img{
        height: 90.271px;
        width: 232.774px;
        transform: translate(-113.548px, 28.3871px);
    }
    .top-pics .layer:nth-child(11) img{
        height: 105.806px;
        width: 198.71px;
        transform: translate(361.29px, 36.129px);
        opacity: 0;
    }
    .top-pics .layer:nth-child(12) img{
        height: 174.039px;
        width: 450.271px;
        transform: translate(-433.548px);
        opacity: 0;
    }
    .top-pics .layer:nth-child(13) img{
        height: 112.413px;
        width: 336.671px;
        transform: translate(-397.419px, 22.7097px);
    }
    .top-pics .layer:nth-child(14) img{
        height: 232.052px;
        width: 600.361px;
        transform: translate(825.806px);
    }
    .top-pics .layer:nth-child(15) img{
        height: 145.239px;
        width: 460.284px;
        transform: translate(-144.516px);
    }
    .top-pics .layer:nth-child(16) img{
        height: 145.239px;
        width: 460.284px;
        transform: translate(578.065px);
    }
    .top-pics .layer:nth-child(17) video{
        width: 1858.06px;
        height: 102.813px;
        transform: translate(37.1613px, 43.3548px);
    }
    .top-pics .layer:nth-child(18) video{
        height: 138.116px;
        width: 1296.31px;
        opacity: 0.6;
    }
</style>