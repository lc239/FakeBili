<script setup>
    import { ref } from 'vue'
    import { useHistoryStore } from '@/stores/index-history'
    import { storeToRefs } from 'pinia'

    const trendsPicPathPrefix = './src/assets/images/top-nav/trends/'
    const trends = [{id:1,text:'S13瑞士轮DK KT',src:'onLive.gif'},{id:2,text:'JDG战胜BLG',src:'hot.png'},{id:3,text:'G2翻盘战胜WBG',src:'hot.png'},{id:4,text:'被211大学讲师抽查知识点',src:'new.png'},{id:5,text:'王多多鼓鼓957群口相声',src:null}]

    const historyStore = useHistoryStore()//历史记录store
    const {clearHistory} = historyStore
    const {history} = storeToRefs(historyStore)//localStorage读取历史搜索记录
    
    const cleanInput = ref('hidden')//搜索框旁的清除图标状态
    const centerNav = ref(null)
    const searchInput = ref(null)//搜索里的input引用
    const searchForm = ref(null)//搜索区域form引用
    const searchFocus = ref(false)//焦点是否在搜索区域内
    function search(text){
        searchInput.value.value = text
        addHistory()
        searchForm.value.submit()
    }
    function clickSearchButton(){
        if(searchInput.value.value === ''){
            searchInput.value.value = searchInput.value.placeholder
        }
        addHistory()
    }
    function addHistory(){
        const text = searchInput.value.value
        if(history.value.length === 0){
            history.value.push({id:0,text})
        }
        else{
            const i = history.value.findIndex((v) => v.text === text)
            if(i !== -1){
                history.value.splice(i, 1)
            }
            history.value.unshift({id:history.value.at(-1).id + 1,text})
        }
    }
    function onSearchFocus(){
        searchFocus.value = true
    }
    function onSearchBlur(e){
        if(!centerNav.value.contains(e.relatedTarget)){
            searchFocus.value = false
        }
    }
    function checkSearchContent(e){
        if(e.target.value === '') cleanInput.value = 'hidden'
        else cleanInput.value = ''
    }
    function clearInput(){
        searchInput.value.value = ''
        searchInput.value.focus()
        cleanInput.value = 'hidden'
    }
</script>

<template>
    <div ref="centerNav" class="center-nav">
            <form ref="searchForm" class="search-nav" :class="{'search-open':searchFocus}" action="" method="get">
                <div class="search-content" :class="{'search-open':searchFocus}">
                    <input ref="searchInput" type="text" @input="checkSearchContent" @focus="onSearchFocus" @blur="onSearchBlur" placeholder="替代文本" title="标题">
                    <svg :style="{visibility:cleanInput}" @click="clearInput" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.75C11.7279 14.75 14.75 11.7279 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75ZM9.64999 5.64303C9.84525 5.44777 10.1618 5.44777 10.3571 5.64303C10.5524 5.83829 10.5524 6.15487 10.3571 6.35014L8.70718 8.00005L10.3571 9.64997C10.5524 9.84523 10.5524 10.1618 10.3571 10.3571C10.1618 10.5523 9.84525 10.5523 9.64999 10.3571L8.00007 8.70716L6.35016 10.3571C6.15489 10.5523 5.83831 10.5523 5.64305 10.3571C5.44779 10.1618 5.44779 9.84523 5.64305 9.64997L7.29296 8.00005L5.64305 6.35014C5.44779 6.15487 5.44779 5.83829 5.64305 5.64303C5.83831 5.44777 6.15489 5.44777 6.35016 5.64303L8.00007 7.29294L9.64999 5.64303Z" fill="#C9CCD0"></path>
                    </svg>
                </div>
                <button class="search-btn" type="submit" @click="clickSearchButton">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z" fill="currentColor"></path>
                    </svg>
                </button>
            </form>
            <div class="search-panel" v-show="searchFocus" @focus="onSearchFocus" @blur="onSearchBlur" tabindex="0">
                <div class="header">
                    <div class="title">搜索历史</div>
                    <div class="clear-history" @click="clearHistory(null)">清空</div>
                </div>
                <div class="history">
                    <div class="history-item" v-for="(item) in history" :key="item.id" @click="search(item.text)">
                        <div class="history-text">{{ item.text }}</div>
                        <svg class="history-item-delete" viewBox="0 0 1024 1024" width="14" height="14" @click.stop="clearHistory(item)">
                            <path d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462
                                0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102
                                447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499
                                12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997
                                9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727
                                c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415
                                c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221
                                c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093
                                l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924
                                0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z">
                            </path>
                        </svg>
                    </div>
                </div>
                <div class="header">
                    <div class="title">bilibili热搜</div>
                </div>
                <div class="trends">
                    <div class="trend" v-for="(item) in trends" :key="item.id" @click="search(item.text)">
                        <div class="rank" :style="{color:item.id < 4 ? 'var(--text2)' : '#9499A0'}">{{ item.id }}</div>
                        <div class="text">{{ item.text }}</div>
                        <img v-if="item.src" :src="trendsPicPathPrefix + item.src">
                    </div>
                </div>
            </div>
        </div>
</template>

<style>
    .center-nav{
        flex:1;
        margin: 0 auto;
        min-width: 181px;
        max-width: 500px;
        height: 38px;
    }
    .search-nav{
        display: flex;
        align-items: center;
        height: 40px;
        border-radius: 8px;
        background-color: #f1f2f3;
        opacity: 0.9;
        margin: 0 auto;
        padding: 1px 8px 1px 5px;
    }
    .search-nav:hover{
        opacity: 1;
        background-color: #fff;
    }
    .search-nav.search-open{
        border-radius: 8px 8px 0 0;
    }
    .search-nav .search-content{
        display: flex;
        flex:1;
        align-items: center;
        height: 32px;
        padding: 0 8px;
        border-radius: 6px;
        overflow: hidden;
    }
    .search-content.search-open{
        background-color: #E3E5E7;
    }
    .search-content input{
        flex: 1;
        height: 20px;
        border: none;
        background-color: transparent;
        color: var(--text1);
        font-family: inherit;
        font-size: inherit;
    }
    .search-content input:focus{
       outline: none;
       background-color: #E3E5E7;
       color: var(--text2);
    }
    .search-content svg{
        cursor: pointer;
    }
    .search-content svg:hover path{
        fill: var(--text1);
    }
    .search-nav .search-btn{
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        margin-left: 9px;
        background-color: transparent;
        cursor: pointer;
        transition: all .3s;
    }
    .search-nav .search-btn:hover{
        background-color: #E3E5E7;
    }
    .search-panel{
        max-height: 612px;
        background-color: #fff;
        padding: 13px 1px 17px 1px;
        border-radius: 0 0 8px 8px;
    }
    .search-panel .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
    }
    .header .title{
        font-size: 16px;
        height: 24px;
        line-height: 24px;
        font-weight: 500;
        font-family: PingFang SC,HarmonyOS_Medium,Helvetica Neue,Microsoft YaHei,sans-serif;
    }
    .header .clear-history{
        font-size: 12px;
        height: 15px;
        line-height: 15px;
        color: #9499A0;
        cursor: pointer;
    }
    .header .clear-history:hover{
        color: #00AEEC;
    }
    .search-panel .history{
        display: flex;
        flex-wrap: wrap;
        max-height: 172px;
        padding: 0 16px;
        margin: 12px 0 4px 0;
    }
    .history .history-item{
        height: 30px;
        max-width: 116px;
        padding: 7px 10px 8px;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        background-color: #F6F7F8;
        margin: 0 10px 10px 0;
        outline: none;
        position: relative;
    }
    .history-text{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .history-item:hover{
        color: #00AEEC;
    }
    .history-item:focus{
        color: #00AEEC;
    }
    .history-item .history-item-delete{
        position: absolute;
        fill: #ccc;
        right: -7px;
        top: -3px;
        display: none;
    }
    .history-item:focus .history-item-delete{
        display: block;
    }
    .history-item:hover .history-item-delete{
        display: block;
    }
    .trends{
        display: flex;
        flex-wrap: wrap;
    }
    .trends .trend{
        width: 50%;
        display: flex;
        align-items: center;
        height: 38px;
        line-height: 17px;
        padding-left: 16px;
        cursor: pointer;
    }
    .trends .trend:hover{
        background-color: #E3E5E7;
    }
    .trends .trend .rank{
        width: 15px;
        height: 17px;
        text-align: center;
        margin-right: 7px;
    }
    .trends .trend .text{
        height: 17px;
        margin-right: 6px;
        overflow: hidden;
    }
    .trends .trend img{
        height: 14px;
        margin-right: 16px;
    }
</style>