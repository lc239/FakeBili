<script setup>
    import TopPics from './components/TopPics.vue';
    import TopNav from './components/TopNav.vue';
    import { useMouse } from './js/mouse';
    import { ref, computed } from 'vue';
    const headerBanner = ref(null)
    const mouseOffset = useMouse(headerBanner)
    const picoffset = computed(() => mouseOffset.value.x - mouseOffset.value.startX)
</script>

<template>
    <div class="header-banner" ref="headerBanner">
        <TopPics :pic-offset="picoffset"></TopPics>
        <TopNav></TopNav>
    </div>
    
</template>

<style>

</style>