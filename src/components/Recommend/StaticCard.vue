<script setup>
    import { useUnit } from '@/js/utils'
    import { svgObjLoad } from '@/js/object'

    defineProps({
        type: {
            type: Number,
            required: true
        },
        title: String,
        state: String,
        playCount: Number,
        likeCount: Number,
        area: String,
        viewCount: Number,
        upName: String,
        cover: String
    })

    let upIcon = {svg: null}
    function initColorWhite(svg){
        svg.style.color = 'white'
    }
    function initColor1(svg){
        svg.style.color = '#9499A0'
        svg.style.transition = 'color .2s'
    }
    function changeColor(svg){
        if(svg.style.color === '#9499A0' || svg.style.color === 'rgb(148, 153, 160)') svg.style.color = '#00AEEC'
        else svg.style.color = '#9499A0'
    }

</script>

<template>
    <div class="static-card">
        <a href="" class="cover">
            <img :src="cover">
            <div v-if="type === 1" class="icon">
                <object class="svg" data="/assets/svg/channelLive.svg" type="image/svg+xml"></object>
                <span>直播</span>
            </div>
            <div v-else-if="type === 2" class="icon">
                <object class="svg" data="/assets/svg/anime.svg" type="image/svg+xml"></object>
                <span>番剧</span>
            </div>
            <div v-else-if="type === 3" class="icon">
                <object class="svg" data="/assets/svg/teleplay.svg" type="image/svg+xml"></object>
                <span>电视剧</span>
            </div>

            <div class="bottom">
                <div class="left">
                    <object v-if="type === 1" class="svg" data="/assets/svg/eye.svg" type="image/svg+xml" @load="e => svgObjLoad(e, initColorWhite)"></object>
                    <span v-if="type === 1" class="text">{{ useUnit(viewCount) }}</span>
                    <object v-if="type === 2 || type === 3" class="svg" data="/assets/svg/playCount.svg" type="image/svg+xml" @load="e => svgObjLoad(e, initColorWhite)" @mouseenter="e => e.target.contentDocument.firstChild.style.color = '#00AEEC'"></object>
                    <span v-if="type === 2 || type === 3" class="text">{{ useUnit(playCount) }}</span>
                    <object v-if="type === 2" class="svg" data="/assets/svg/heart.svg" type="image/svg+xml" @load="e => svgObjLoad(e, initColorWhite)"></object>
                    <span v-if="type === 2" class="text">{{ useUnit(likeCount) }}</span>
                </div>
                <div class="right">
                    <span v-if="type === 1">{{ area }}</span>
                </div>
            </div>
        </a>
        <div class="description">
            <div class="title" :title="title">
                <a href="">
                    <div v-if="type === 1" class="living-icon">
                        <img width="12" height="12" src="@/assets/images/live.gif">
                        <span>直播中</span>
                    </div>
                    <span>{{ title }}</span>
                </a>
            </div>
            <div class="other">
                <a v-if="type === 1 || type === 3" href="" class="up-name" @mouseenter="changeColor(upIcon.svg)" @mouseleave="changeColor(upIcon.svg)">
                    <object class="svg" data="/assets/svg/up.svg" type="image/svg+xml" @load="e => svgObjLoad(e, initColor1, upIcon)"></object>
                    <span>{{ upName }}</span>
                </a>
                <a v-else-if="type === 2" href="" :title="state">
                    <span>{{ state }}</span>
                </a>
            </div>
        </div>
        <div class="shadow">
            <div class="layer"></div>
            <div class="layer"></div>
        </div>
    </div>
</template>

<style>
    .static-card{
        --title-line-height: 22px;
        --update-info-line-height: 17px;
        --bottom-line-height: 18px;
    }
    .static-card{
        border: 1px solid var(--Ga2);
        border-top: none;
        border-radius: 6px;
        box-shadow: 0 0 40px rgba(0,0,0,.03);
        position: relative;
        transition: background-color .3s;
    }
    .static-card:hover{
        background-color: #F1F2F3;
    }
    .static-card .cover{
        display: block;
        position: relative;
        width: 100%;
        height: var(--visual-cover-radio);
        overflow: hidden;
        border-radius: 6px;
    }
    .static-card .cover img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .static-card .cover .icon{
        position: absolute;
        top: 6px;
        left: 6px;
        padding: 0 6px;
        border-radius: 6px;
        height: 27px;
        display: flex;
        align-items: center;
        background-color: white;
    }
    .static-card .cover .icon object{
        width: 20px;
        height: 20px;
        margin-right: 2px;
    }
    .static-card .cover .icon span{
        font-size: 15px;
        font-weight: 500;
    }
    .static-card .cover .bottom{
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 8px 6px;
        color: white;
        font-size: 13px;
        background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.8) 100%);
    }
    .static-card .cover .bottom > div{
        display: flex;
        align-items: center;
    }
    .static-card .cover .bottom > div > .svg{
        width: 18px;
        height: 18px;
        margin-right: 2px;
    }
    .static-card .cover .bottom > div .text{
        margin-right: 12px;
    }
    .static-card .description{
        padding: 10px 12px 16px;
    }
    .static-card .description .title{
        line-height: var(--title-line-height);
        height: calc(2 * var(--title-line-height));
        padding-right: 24px;
        margin-bottom: 3px;
        color: var(--text2);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 15px;
        font-weight: 500;
    }
    .static-card .description .title a, .static-card .description .other .up-name{
        transition: color .2s;
    }
    .static-card .description .title a:hover, .static-card .description .other .up-name:hover{
        color: var(--blue1);
    }
    .static-card .description .living-icon{
        display: inline-flex;
        align-items: center;
        padding: 0 4px;
        margin-right: 4px;
        border: 1px solid #FF6699;
        border-radius: 4px;
        color: #FF6699;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
    }
    .static-card .description .living-icon img{
        width: 12px;
        height: 12px;
        margin-right:3px;
    }
    .static-card .description .other > a{
        display: flex;
        align-items: center;
        height: 16px;
        color: #9499A0;
        font-size: 13px;
    }
    .static-card .description .other .up-name .svg{
        width: 16px;
        height: 16px;
        margin-right: 2px;
    }
    .static-card .shadow{
        position: absolute;
        top: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .static-card .shadow .layer:nth-child(1){
        width: 90%;
        height: 6px;
        border-radius: 0 0 6px 6px;
        background-color: var(--Ga2);
    }
    .static-card .shadow .layer:nth-child(2){
        width: 80%;
        height: 6px;
        border-radius: 0 0 6px 6px;
        background-color: #F1F2F3;
    }
</style>