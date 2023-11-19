import { defineStore } from "pinia"
import { ref } from 'vue'

export const useHeaderChannelStore = defineStore('header-channel',() => {
    const anime = [
        {name: '连载动画', href: ''}, {name: '完结动画', href: ''}, {name: '资讯', href: ''}, {name: '官方延伸', href: ''},
        {name: '新番时间表', href: ''}, {name: '番剧索引', href: ''}
    ]
    const domestic = [
        {name: '国产动画', href: ''}, {name: '国产原创相关', href: ''}, {name: '布袋戏', href: ''}, {name: '动态漫·广播剧', href: ''},
        {name: '资讯', href: ''}, {name: '新番时间表', href: ''}, { name: '国产动画索引', href: ''}
    ]
    const entertainment = [
        {name: '综艺', href: ''}, {name: '娱乐杂谈', href: ''}, {name: '粉丝创作', href: ''}, {name: '明星综合', href: ''}
    ]
    const game = [
        {name: '单机游戏', href: ''}, {name: '电子竞技', href: ''}, {name: '手机游戏', href: ''}, {name: '网络游戏', href: ''}, {name: '桌游棋牌', href: ''},
        {name: 'GMV', href: ''}, {name: '音游', href: ''}, {name: 'Mugen', href: ''}, {name: '游戏赛事', href: ''}
    ]
    const more = [
        {name: '搞笑', href: ''}, {name: '单机游戏', href: ''}, {name: '虚拟UP主', href: ''}, {name: '公益', href: ''}, {name: '公开课', href: ''}
    ]
    const channelLeft = [
        {name: '番剧', href: ''}, {name: '国创', href: ''}, {name: '综艺', href: ''}, {name: '动画', href: ''}, {name: '鬼畜', href: ''}, {name: '舞蹈', href: ''},
        {name: '娱乐', href: ''}, {name: '科技', href: ''}, {name: '美食', href: ''}, {name: '汽车', href: ''}, {name: '运动', href: ''}, {name: 'VLOG', href: ''},
        {name: '电影', href: ''}, {name: '电视剧', href: ''}, {name: '纪录片', href: ''}, {name: '游戏', href: ''}, {name: '音乐', href: ''}, {name: '影视', href: ''},
        {name: '知识', href: ''}, {name: '资讯', href: ''}, {name: '生活', href: ''}, {name: '时尚', href: ''}, {name: '动物圈', href: ''}
    ]
    const channelLeftClasses = [anime, domestic, null, null, null, null, entertainment, null, null, null, null, null, null, null, null, game, null, null, null, null, null, null, null]
    const channelRight = [
        {name: '专栏', href: ''}, {name: '活动', href: ''}, {name: '社区中心', href: ''}, {name: '直播', href: ''}, {name: '课堂', href: ''}, {name: '新歌热榜', href: ''}
    ]
    const headerChannelVisible = ref(true)
    return {channelLeft, channelLeftClasses, more, channelRight, headerChannelVisible}
},{
    persist:true
})