<script setup>
    defineProps(['classes', 'dir', 'show'])
</script>

<template>
        <div v-show="$props.show" class="channel-classes-shell" :class="{up: dir === 'up', down: dir === 'down'}">
            <div class="channel-classes">
                <a class="channel-class-item" v-for="item in $props.classes" :key="item.id">{{ item.name }}</a>
            </div>
        </div>
</template>

<style>
    .channel-classes-shell{
        position: absolute;
        z-index: 50;
        padding-bottom: 6px;
    }
    .channel-classes{
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 8px;
        grid-template-rows: repeat(4, 1fr);
        padding: 8px 16px;
        width: max-content;
        background-color: white;
        border-radius: 8px;
        border: 1px solid #E3E5E7;
        box-shadow: 0 0 30px rgba(0,0,0,.1)
    }
    .channel-classes-shell.up{
        bottom: 100%;
    }
    .channel-classes a{
        padding: 0 6px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        color: var(--text2);
        font-size: 13px;
        letter-spacing: 0;
        text-align: left;
        cursor: pointer;
        transition: all .3s;
    }
    .channel-classes a:hover{
        background-color: #E3E5E7;
    }
</style>