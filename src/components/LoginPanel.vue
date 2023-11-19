<script setup>
    import { inject, ref, watch } from 'vue'
    import instance from '../conf/axios-instance';
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'

    const {token, refreshToken} = storeToRefs(useUserStore())
    const emit = defineEmits(['close'])
    const props = defineProps({
        login: {
            default: true
        }
    })
    const queryBasic = inject('queryBasic')
    const login = ref(props.login)//打开登录面板还是注册面板
    const inputtingPrivate = ref(false)//正在输入敏感信息
    const scanTitle = ref('扫描二维码登录')
    const scanImgSrc = ref('qr.png')
    const pwdType = ref('password')
    const loginDisable = ref(true)
    const account = ref('')
    const password = ref('')
    const registerAccount = ref('')
    const registerPassword = ref('')
    const mail = ref('')
    const veriCode = ref('')
    const vCodeDisable = ref(true)
    const loginError = ref('')
    
    function changePwdVisible(){
        if(pwdType.value === 'password'){
            pwdType.value = 'text'
        }
        else{
            pwdType.value = 'password'
        }
    }
    function changePanel(toLogin){
        login.value = toLogin
        loginError.value = ''//清空提示信息
    }
    //账号密码都写了才能按登录按钮
    watch(() => account.value.length === 0 || password.value.length === 0, result => {
        loginDisable.value = result
    })

    let errorMsgTimer
    function showLoginMsg(msg){
        loginError.value = msg
        if(errorMsgTimer) clearTimeout(errorMsgTimer)
        errorMsgTimer = setTimeout(() => {
            loginError.value = ''
            errorMsgTimer = null
        }, 1000)
    }
    function registerPost(){
        instance.post('/register', document.querySelector('.register-form'), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200){
                token.value = res.data.token
                refreshToken.value = res.data.refreshToken
                emit('close')
                queryBasic()
            }
        }).catch(err => {
            if(err.response){
                if(err.response.data.code === 1){
                    showLoginMsg('用户名已存在')
                }
            }else{
                showLoginMsg('请求超时')
            }
        })
    }
    function loginPost(){
        instance.post('/login', document.querySelector('.login-form'), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 200){
                token.value = res.data.token
                refreshToken.value = res.data.refreshToken
                emit('close')
                queryBasic()
            }
        }).catch(err => {
            if(err.response){
                if(err.response.status === 409){
                    if(err.response.data.code === 1){
                        showLoginMsg('用户名或密码错误')
                    }
                }
            }else{
                showLoginMsg('请求超时')
            }
        })
    }
</script>

<template>
    <div class="login-panel" :class="{'inputting-private': inputtingPrivate}">
        <button class="close" @click="$emit('close')">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.21967 9.22131C9.51256 8.92842 9.98744 8.92842 10.2803 9.22131L16.2906 15.2315L22.3024 9.21967C22.5953 8.92678 23.0702 8.92678 23.3631 9.21967C23.656 9.51256 23.656 9.98744 23.3631 10.2803L17.3512 16.2922L23.3618 22.3028C23.6547 22.5957 23.6547 23.0706 23.3618 23.3634C23.0689 23.6563 22.594 23.6563 22.3011 23.3634L16.2906 17.3529L10.2816 23.3618C9.98873 23.6547 9.51386 23.6547 9.22096 23.3618C8.92807 23.0689 8.92807 22.594 9.22096 22.3011L15.2299 16.2922L9.21967 10.282C8.92678 9.98908 8.92678 9.5142 9.21967 9.22131Z" fill="#18191C"/>
                <path d="M10.2803 9.22131L10.0682 9.43344L10.0682 9.43344L10.2803 9.22131ZM16.2906 15.2315L16.0784 15.4437L16.2906 15.6558L16.5027 15.4437L16.2906 15.2315ZM22.3024 9.21967L22.0903 9.00754L22.3024 9.21967ZM23.3631 10.2803L23.5752 10.4925L23.3631 10.2803ZM17.3512 16.2922L17.1391 16.0801L16.927 16.2922L17.1391 16.5043L17.3512 16.2922ZM22.3011 23.3634L22.089 23.5756L22.089 23.5756L22.3011 23.3634ZM16.2906 17.3529L16.5027 17.1407L16.2906 16.9286L16.0784 17.1407L16.2906 17.3529ZM10.2816 23.3618L10.0695 23.1497L10.0695 23.1497L10.2816 23.3618ZM9.22096 22.3011L9.00883 22.089L9.00883 22.089L9.22096 22.3011ZM15.2299 16.2922L15.442 16.5043L15.6542 16.2922L15.442 16.0801L15.2299 16.2922ZM9.21967 10.282L9.4318 10.0698L9.21967 10.282ZM10.4925 9.00918C10.0824 8.59913 9.41759 8.59913 9.00754 9.00918L9.4318 9.43344C9.60754 9.25771 9.89246 9.25771 10.0682 9.43344L10.4925 9.00918ZM16.5027 15.0194L10.4925 9.00918L10.0682 9.43344L16.0784 15.4437L16.5027 15.0194ZM22.0903 9.00754L16.0784 15.0194L16.5027 15.4437L22.5146 9.4318L22.0903 9.00754ZM23.5752 9.00754C23.1652 8.59749 22.5004 8.59749 22.0903 9.00754L22.5146 9.4318C22.6903 9.25607 22.9752 9.25607 23.151 9.4318L23.5752 9.00754ZM23.5752 10.4925C23.9853 10.0824 23.9853 9.41759 23.5752 9.00754L23.151 9.4318C23.3267 9.60754 23.3267 9.89246 23.151 10.0682L23.5752 10.4925ZM17.5634 16.5043L23.5752 10.4925L23.151 10.0682L17.1391 16.0801L17.5634 16.5043ZM23.5739 22.0907L17.5634 16.0801L17.1391 16.5043L23.1497 22.5149L23.5739 22.0907ZM23.5739 23.5756C23.984 23.1655 23.984 22.5007 23.5739 22.0907L23.1497 22.5149C23.3254 22.6907 23.3254 22.9756 23.1497 23.1513L23.5739 23.5756ZM22.089 23.5756C22.4991 23.9856 23.1639 23.9856 23.5739 23.5756L23.1497 23.1513C22.9739 23.327 22.689 23.327 22.5133 23.1513L22.089 23.5756ZM16.0784 17.565L22.089 23.5756L22.5133 23.1513L16.5027 17.1407L16.0784 17.565ZM10.4938 23.5739L16.5027 17.565L16.0784 17.1407L10.0695 23.1497L10.4938 23.5739ZM9.00883 23.5739C9.41888 23.984 10.0837 23.984 10.4938 23.5739L10.0695 23.1497C9.89376 23.3254 9.60883 23.3254 9.4331 23.1497L9.00883 23.5739ZM9.00883 22.089C8.59878 22.4991 8.59878 23.1639 9.00883 23.5739L9.4331 23.1497C9.25736 22.9739 9.25736 22.689 9.4331 22.5133L9.00883 22.089ZM15.0178 16.0801L9.00883 22.089L9.4331 22.5133L15.442 16.5043L15.0178 16.0801ZM9.00754 10.4941L15.0178 16.5043L15.442 16.0801L9.4318 10.0698L9.00754 10.4941ZM9.00754 9.00918C8.59749 9.41923 8.59749 10.0841 9.00754 10.4941L9.4318 10.0698C9.25607 9.8941 9.25607 9.60918 9.4318 9.43344L9.00754 9.00918Z" fill="#18191C"/>
            </svg>
        </button>
        <div class="scan-login">
            <span class="title">{{ scanTitle }}</span>
            <div class="qr">
                <img :src="`/images/login-panel/${scanImgSrc}`">
            </div>
            <div class="tip">
                <div>请使用<a href="">哔哩哔哩客户端</a></div>
                <div>扫码登录或扫码下载APP</div>
            </div>
        </div>
        <div class="line"></div>
        <div class="inp-login">
            <div class="tab-title">
                <span class="title" :class="{active: login}" @click="changePanel(true)">密码登录</span>
                <span class="line"></span>
                <span class="title" :class="{active: !login}" @click="changePanel(false)">邮箱注册</span>
            </div>
            <form v-if="login" method="post" class="login-form">
                <div class="inp-area">
                    <div class="inp">
                        <label>账号<input v-model="account" type="text" name="account" placeholder="请输入账号" maxlength="20"></label>
                    </div>
                    <div class="line"></div>
                    <div class="inp">
                        <label>密码<input v-model="password" :type="pwdType" name="password" placeholder="请输入密码" maxlength="20" autocomplete="off" @focus="inputtingPrivate = true" @blur="inputtingPrivate = false"></label>
                        <svg v-if="pwdType === 'password'" width="20" height="20" @click="changePwdVisible" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5753 6.85456C17.7122 6.71896 17.8939 6.63806 18.0866 6.63806C18.7321 6.63806 19.0436 7.42626 18.5748 7.87006C18.1144 8.30554 17.457 8.69885 16.6478 9.03168L18.1457 10.5296C18.2101 10.5941 18.2613 10.6706 18.2962 10.7548C18.331 10.839 18.349 10.9293 18.349 11.0204C18.349 11.1116 18.331 11.2019 18.2962 11.2861C18.2613 11.3703 18.2101 11.4468 18.1457 11.5113C18.0812 11.5757 18.0047 11.6269 17.9205 11.6618C17.8363 11.6967 17.746 11.7146 17.6548 11.7146C17.5637 11.7146 17.4734 11.6967 17.3892 11.6618C17.305 11.6269 17.2284 11.5757 17.164 11.5113L15.3409 9.68819C15.2898 9.63708 15.247 9.57838 15.2141 9.51428C14.4874 9.71293 13.6876 9.87122 12.8344 9.98119C12.8363 9.99011 12.8381 9.99908 12.8397 10.0081L13.2874 12.5472C13.315 12.7266 13.2713 12.9098 13.1656 13.0573C13.0598 13.2049 12.9005 13.3052 12.7217 13.3367C12.5429 13.3683 12.3589 13.3285 12.2091 13.2259C12.0592 13.1234 11.9555 12.9663 11.9202 12.7882L11.4725 10.2491C11.4645 10.2039 11.4611 10.1581 11.4621 10.1125C10.9858 10.1428 10.4976 10.1586 10.0002 10.1586C9.57059 10.1586 9.14778 10.1468 8.73362 10.1241C8.73477 10.1656 8.7322 10.2074 8.72578 10.249L8.27808 12.7881C8.24612 12.9694 8.14345 13.1306 7.99265 13.2362C7.84186 13.3418 7.65528 13.3831 7.47398 13.3512C7.29268 13.3192 7.1315 13.2166 7.0259 13.0658C6.9203 12.915 6.87892 12.7284 6.91088 12.5471L7.35858 10.008C7.35877 10.007 7.35896 10.0061 7.35915 10.0052C6.50085 9.90284 5.6941 9.75191 4.95838 9.56025C4.93012 9.60634 4.89634 9.64933 4.85748 9.68819L3.03438 11.5113C2.96992 11.5757 2.8934 11.6269 2.80918 11.6618C2.72496 11.6967 2.63469 11.7146 2.54353 11.7146C2.45237 11.7146 2.36211 11.6967 2.27789 11.6618C2.19367 11.6269 2.11714 11.5757 2.05268 11.5113C1.98822 11.4468 1.93709 11.3703 1.90221 11.2861C1.86732 11.2019 1.84937 11.1116 1.84937 11.0204C1.84937 10.9293 1.86732 10.839 1.90221 10.7548C1.93709 10.6706 1.98822 10.5941 2.05268 10.5296L3.49373 9.08855C2.6197 8.744 1.91247 8.33062 1.42559 7.87006C0.956591 7.42636 1.26799 6.63816 1.91359 6.63816C2.10629 6.63816 2.28789 6.71896 2.42489 6.85456C2.70009 7.12696 3.19529 7.45886 3.98459 7.77796C5.54429 8.40856 7.73699 8.77016 10.0001 8.77016C12.2632 8.77016 14.4558 8.40856 16.0156 7.77796C16.8049 7.45886 17.3001 7.12696 17.5753 6.85456Z" fill="#9499A0"></path>
                        </svg>
                        <svg v-else @click="changePwdVisible" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.11069 9.43732C3.21647 7.77542 5.87904 4.58331 9.89458 4.58331C13.8801 4.58331 16.6483 7.72502 17.8345 9.4049C18.0905 9.76747 18.0905 10.2325 17.8345 10.5951C16.6483 12.2749 13.8801 15.4166 9.89458 15.4166C5.87904 15.4166 3.21647 12.2245 2.11069 10.5626C1.88009 10.2161 1.88009 9.7839 2.11069 9.43732ZM9.89458 3.33331C5.19832 3.33331 2.20919 7.03277 1.07001 8.74489C0.560324 9.51091 0.560323 10.4891 1.07001 11.2551C2.20919 12.9672 5.19832 16.6666 9.89458 16.6666C14.5412 16.6666 17.6368 13.0422 18.8556 11.3161C19.4168 10.5213 19.4168 9.4787 18.8556 8.68391C17.6368 6.95774 14.5412 3.33331 9.89458 3.33331ZM7.29165 9.99998C7.29165 8.50421 8.50421 7.29165 9.99998 7.29165C11.4958 7.29165 12.7083 8.50421 12.7083 9.99998C12.7083 11.4958 11.4958 12.7083 9.99998 12.7083C8.50421 12.7083 7.29165 11.4958 7.29165 9.99998ZM9.99998 6.04165C7.81385 6.04165 6.04165 7.81385 6.04165 9.99998C6.04165 12.1861 7.81385 13.9583 9.99998 13.9583C12.1861 13.9583 13.9583 12.1861 13.9583 9.99998C13.9583 7.81385 12.1861 6.04165 9.99998 6.04165Z" fill="#9499A0"></path>
                        </svg>
                        <div class="forget-pwd">忘记密码？</div>
                    </div>
                    <Transition name="login-msg">
                        <div class="error-msg" v-if="loginError">{{ loginError }}</div>
                    </Transition>
                </div>
                <div class="btn">
                    <button type="button" class="go-register-btn" @click="changePanel">去注册</button>
                    <button type="button" class="login-btn" :disabled="loginDisable" @click="loginPost">登录</button>
                </div>
            </form>
            <form v-else method="post" class="register-form">
                <div class="inp-area">
                    <div class="inp">
                        <label>账号&#12288;<input v-model="registerAccount" type="text" name="account" placeholder="请输入账号" maxlength="20"></label>
                    </div>
                    <div class="line"></div>
                    <div class="inp">
                        <label>密码&#12288;<input v-model="registerPassword" :type="pwdType" name="password" placeholder="请输入密码" maxlength="20" autocomplete="off" @focus="inputtingPrivate = true" @blur="inputtingPrivate = false"></label>
                        <svg v-if="pwdType === 'password'" width="20" height="20" @click="changePwdVisible" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5753 6.85456C17.7122 6.71896 17.8939 6.63806 18.0866 6.63806C18.7321 6.63806 19.0436 7.42626 18.5748 7.87006C18.1144 8.30554 17.457 8.69885 16.6478 9.03168L18.1457 10.5296C18.2101 10.5941 18.2613 10.6706 18.2962 10.7548C18.331 10.839 18.349 10.9293 18.349 11.0204C18.349 11.1116 18.331 11.2019 18.2962 11.2861C18.2613 11.3703 18.2101 11.4468 18.1457 11.5113C18.0812 11.5757 18.0047 11.6269 17.9205 11.6618C17.8363 11.6967 17.746 11.7146 17.6548 11.7146C17.5637 11.7146 17.4734 11.6967 17.3892 11.6618C17.305 11.6269 17.2284 11.5757 17.164 11.5113L15.3409 9.68819C15.2898 9.63708 15.247 9.57838 15.2141 9.51428C14.4874 9.71293 13.6876 9.87122 12.8344 9.98119C12.8363 9.99011 12.8381 9.99908 12.8397 10.0081L13.2874 12.5472C13.315 12.7266 13.2713 12.9098 13.1656 13.0573C13.0598 13.2049 12.9005 13.3052 12.7217 13.3367C12.5429 13.3683 12.3589 13.3285 12.2091 13.2259C12.0592 13.1234 11.9555 12.9663 11.9202 12.7882L11.4725 10.2491C11.4645 10.2039 11.4611 10.1581 11.4621 10.1125C10.9858 10.1428 10.4976 10.1586 10.0002 10.1586C9.57059 10.1586 9.14778 10.1468 8.73362 10.1241C8.73477 10.1656 8.7322 10.2074 8.72578 10.249L8.27808 12.7881C8.24612 12.9694 8.14345 13.1306 7.99265 13.2362C7.84186 13.3418 7.65528 13.3831 7.47398 13.3512C7.29268 13.3192 7.1315 13.2166 7.0259 13.0658C6.9203 12.915 6.87892 12.7284 6.91088 12.5471L7.35858 10.008C7.35877 10.007 7.35896 10.0061 7.35915 10.0052C6.50085 9.90284 5.6941 9.75191 4.95838 9.56025C4.93012 9.60634 4.89634 9.64933 4.85748 9.68819L3.03438 11.5113C2.96992 11.5757 2.8934 11.6269 2.80918 11.6618C2.72496 11.6967 2.63469 11.7146 2.54353 11.7146C2.45237 11.7146 2.36211 11.6967 2.27789 11.6618C2.19367 11.6269 2.11714 11.5757 2.05268 11.5113C1.98822 11.4468 1.93709 11.3703 1.90221 11.2861C1.86732 11.2019 1.84937 11.1116 1.84937 11.0204C1.84937 10.9293 1.86732 10.839 1.90221 10.7548C1.93709 10.6706 1.98822 10.5941 2.05268 10.5296L3.49373 9.08855C2.6197 8.744 1.91247 8.33062 1.42559 7.87006C0.956591 7.42636 1.26799 6.63816 1.91359 6.63816C2.10629 6.63816 2.28789 6.71896 2.42489 6.85456C2.70009 7.12696 3.19529 7.45886 3.98459 7.77796C5.54429 8.40856 7.73699 8.77016 10.0001 8.77016C12.2632 8.77016 14.4558 8.40856 16.0156 7.77796C16.8049 7.45886 17.3001 7.12696 17.5753 6.85456Z" fill="#9499A0"></path>
                        </svg>
                        <svg v-else @click="changePwdVisible" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.11069 9.43732C3.21647 7.77542 5.87904 4.58331 9.89458 4.58331C13.8801 4.58331 16.6483 7.72502 17.8345 9.4049C18.0905 9.76747 18.0905 10.2325 17.8345 10.5951C16.6483 12.2749 13.8801 15.4166 9.89458 15.4166C5.87904 15.4166 3.21647 12.2245 2.11069 10.5626C1.88009 10.2161 1.88009 9.7839 2.11069 9.43732ZM9.89458 3.33331C5.19832 3.33331 2.20919 7.03277 1.07001 8.74489C0.560324 9.51091 0.560323 10.4891 1.07001 11.2551C2.20919 12.9672 5.19832 16.6666 9.89458 16.6666C14.5412 16.6666 17.6368 13.0422 18.8556 11.3161C19.4168 10.5213 19.4168 9.4787 18.8556 8.68391C17.6368 6.95774 14.5412 3.33331 9.89458 3.33331ZM7.29165 9.99998C7.29165 8.50421 8.50421 7.29165 9.99998 7.29165C11.4958 7.29165 12.7083 8.50421 12.7083 9.99998C12.7083 11.4958 11.4958 12.7083 9.99998 12.7083C8.50421 12.7083 7.29165 11.4958 7.29165 9.99998ZM9.99998 6.04165C7.81385 6.04165 6.04165 7.81385 6.04165 9.99998C6.04165 12.1861 7.81385 13.9583 9.99998 13.9583C12.1861 13.9583 13.9583 12.1861 13.9583 9.99998C13.9583 7.81385 12.1861 6.04165 9.99998 6.04165Z" fill="#9499A0"></path>
                        </svg>
                    </div>
                    <div class="line"></div>
                    <div class="inp">
                        <label>邮箱&#12288;<input v-model="mail" type="text" name="mail" placeholder="请输入邮箱" maxlength="30"></label>
                        <div class="line"></div>
                        <div class="get-vcode" :class="{disabled: vCodeDisable}">获取验证码</div>
                    </div>
                    <div class="line"></div>
                    <div class="inp">
                        <label>验证码<input v-model="veriCode" maxlength="6" type="text" name="veriCode" placeholder="请输入验证码" autocomplete="off" @focus="inputtingPrivate = true" @blur="inputtingPrivate = false"></label>
                    </div>
                    <Transition name="login-msg">
                        <div class="error-msg" v-if="loginError">{{ loginError }}</div>
                    </Transition>
                </div>
                <div class="btn">
                    <button type="button" class="register-btn" @click="registerPost">注册</button>
                </div>
            </form>
            <div v-if="login" class="other">
                <div class="title">其他方式登录</div>
                <div class="content">
                    <div>
                        <img src="@/assets/images/login-panel/wechat.png"><span>微信登录</span>
                    </div>
                    <div>
                        <img src="@/assets/images/login-panel/weibo.png"><span>微博登录</span>
                    </div>
                    <div>
                        <img src="@/assets/images/login-panel/qq.png"><span>QQ登录</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-agreement">
            <p>未注册过哔哩哔哩的手机号，我们将自动帮你注册账号</p>
            <p>登录或完成注册即代表你同意<a href=""> 用户协议 </a>和<a href=""> 隐私政策 </a></p>
        </div>
    </div>
</template>

<style>
    .login-panel{
        position: relative;
        width: 820px;
        min-height: 430px;
        background-color: white;
        border-radius: 8px;
        padding: 52px 65px 29px 92px;
        background-image: url('@/assets/images/login-panel/22.png'), url('@/assets/images/login-panel/33.png');
        background-repeat: no-repeat, no-repeat;
        background-position: left bottom, right bottom;
        background-size: 14%;
        display: flex;
        justify-content: space-between;
        color: #505050;
        user-select: none;
    }
    .login-panel.inputting-private{
        background-image: url('@/assets/images/login-panel/22_close.png'), url('@/assets/images/login-panel/33_close.png');
    }
    .login-panel .close{
        position: absolute;
        right: 20px;
        top: 20px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border: none;
        background-color: white;
        cursor: pointer;
    }
    .login-panel .login-agreement{
        position: absolute;
        bottom: 29px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 13px;
        color: #999;
    }
    .login-panel .login-agreement p{
        line-height: 19px;
    }
    .login-panel .login-agreement a{
        color: #00A1D6;
    }
    .login-panel > div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .login-panel .scan-login{
        font-family: PingFang SC;
    }
    .login-panel .scan-login .title{
        line-height: 16px;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 26px;
    }
    .login-panel .scan-login .qr{
        width: 173px;
        height: 173px;
    }
    .login-panel .scan-login .qr img{
        height: inherit;
    }
    .login-panel .scan-login .tip{
        text-align: center;
        margin-top: 18px;
        font-size: 13px;
        line-height: 19px;
    }
    .login-panel .scan-login .tip a{
        margin-left: 4px;
        color: var(--link1);
    }
    .login-panel > .line{
        width: 1px;
        height: 228px;
        border-right: 1px solid var(--Ga2);
        margin: 43px 44px 0 45px;
    }
    .login-panel .inp-login{
        position: relative;
    }
    .login-panel .inp-login form{
        width: 400px;
    }
    .login-panel .inp-login form .inp-area{
        width: 100%;
        height: 90px;
        border: 1px solid var(--Ga2);
        border-radius: 8px;
    }
    .login-panel .inp-login form .inp-area > .line{
        border-bottom: 1px solid var(--Ga2);
    }
    .login-panel .inp-login .register-form .inp-area{
        height: 180px;
    }
    .login-panel .inp-login .tab-title{
        margin-bottom: 24px;
    }
    .login-panel .inp-login .tab-title{
        line-height: 20px;
        font-size: 18px;
        font-weight: 500;
    }
    .login-panel .inp-login .tab-title > .line{
        height: 20px;
        border-right: 1px solid var(--Ga2);
        margin: 0 21px;
    }
    .login-panel .inp-login .tab-title .title{
        cursor: pointer;
    }
    .login-panel .inp-login .tab-title .title.active{
        color: #4FA5D9;
        cursor: not-allowed;
    }
    .login-panel .inp-login .inp-area{
        position: relative;
    }
    .login-panel .inp-login .inp{
        height: 44px;
        line-height: 44px;
        padding: 0 20px;
        color: #212121;
        display: flex;
        align-items: center;
    }
    .login-panel .inp-login .inp .get-vcode{
        margin: 0 10px 0 30px;
        color: #00A1D6;
        cursor: pointer;
    }
    .login-panel .inp-login .inp .get-vcode.disabled{
        cursor: not-allowed;
        color: #C9CCD0;
    }
    .login-panel .inp-login .inp > .line{
        height: 26px;
        border-right: 1px solid var(--Ga2);
    }
    .login-panel .inp-login .inp label{
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
    }
    .login-panel .inp-login .inp input{
        flex: 1;
        margin-left: 20px;
        outline: none;
        border: none;
        min-width: 0;
    }
    .login-panel .inp-login .inp svg{
        cursor: pointer;
        margin-right: 10px;
    }
    .login-panel .inp-login .inp .forget-pwd{
        color: #00A1D6;
        cursor: pointer;
    }
    .login-panel .inp-login .inp input::placeholder{
        color: silver;
    }
    .login-panel .inp-login .btn{
        width: 400px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .login-panel .inp-login .btn button{
        width: 194px;
        height: 40px;
        border: 1px solid var(--Ga2);
        border-radius: 8px;
    }
    .login-panel .inp-login .btn .go-register-btn{
        background-color: white;
    }
    .login-panel .inp-login .btn .login-btn{
        background-color: #00AEEC;
        color: white;
    }
    .login-panel .inp-login .btn .register-btn{
        background-color: #00AEEC;
        color: white;
        margin: 0 auto;
    }
    .login-panel .inp-login .btn .login-btn:disabled{
        opacity: .5;
        cursor: not-allowed;
    }
    .login-panel .inp-login .other{
        width: 100%;
        color: var(--grey1);
        font-size: 13px;
        margin-top: 24px;
    }
    .login-panel .inp-login .other .title{
        text-align: center;
    }
    .login-panel .inp-login .other .content{
        display: flex;
        justify-content: space-around;
        margin-top: 12px;
    }
    .login-panel .inp-login .other .content > div{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .login-panel .inp-login .other .content img{
        width: 28px;
        height: 28px;
        margin-right: 8px;
    }
    .login-panel .inp-login .inp-area .error-msg{
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        border-radius: 4px;
        background-color: var(--Ga2);
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all .5s;
    }
    .login-msg-enter-from,.login-msg-leave-to{
        opacity: 0;
    }
    .login-msg-enter-to,.login-msg-leave-from{
        opacity: 1;
    }
</style>