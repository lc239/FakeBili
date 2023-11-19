<script setup>
    import { inject } from 'vue'
    const openLoginOrRegisterPanel = inject('openLoginOrRegisterPanel')
</script>

<template>
    <div class="pop-shell login-tip">
        <div class="login-tip-content">
            <div class="tip">
                <slot></slot>
            </div>
            <button class="login-btn" @click="openLoginOrRegisterPanel">
                <span>立即登录</span>
            </button>
        </div>
    </div>
</template>

<style>
    .login-tip{
        padding-top: 18px;
        top: 100%;
    }
    .login-tip .login-tip-content{
        padding: 22px 20px;
        width: 359px;
        border-radius: 8px;
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        font-size: 14px;
        background-color: white;
    }
    .login-tip .login-tip-content .tip{
        width: 100%;
        text-align: center;
        margin-bottom: 24px;
        color: var(--grey1);
    }
    .login-tip .login-tip-content .login-btn{
        width: 100%;
        height: 40px;
        border-radius: 8px;
        text-align: center;
        line-height: 100%;
        color: white;
        background-color: #00AEEC;
        transition: background-color .3s;
    }
    .login-tip .login-tip-content .login-btn:hover{
        background-color: #00B5E5;
    }
</style>