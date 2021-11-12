<template>
  <div class="login-container">
    <el-form
      ref="loginFormData"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="off"
          @keyup.enter="handleLogin"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.prevent="handleLogin"
        >登录</el-button
      >

      <div style="position: relative">
        <div class="tips">
          <span>用户名 : admin</span>
          <span>密码 : 任意填写</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">用户名 : editor</span>
          <span>密码 : 任意填写 {{ otherQuery.a }}</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog = true"> 第三方登录 </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" v-model="showDialog">
      无法在本地进行模拟，所以请结合您自己的业务模拟! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter, LocationQuery } from 'vue-router'
import { ElInput, ElForm } from 'element-plus'

import { useStore } from '@/store'
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin.vue'

export default defineComponent({
  name: 'Login',
  components: { SocialSign },
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const validateUsername = (rule: any, value: any, callback: any) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule: any, value: any, callback: any) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const loginForm = reactive({
      username: 'admin',
      password: '1111'
    })
    const loginRules = reactive({
      username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      password: [{ required: true, trigger: 'blur', validator: validatePassword }]
    })
    const passwordType = ref('password')
    const capsTooltip = ref(false)
    const loading = ref(false)
    const showDialog = ref(false)
    const redirect = ref()
    let otherQuery = reactive<any>({})

    // refs
    const username = ref<typeof ElInput>()
    const password = ref<typeof ElInput>()

    const getOtherQuery = (query: LocationQuery) => {
      return Object.keys(query).reduce((acc: any, cur: any) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    onMounted(() => {
      const query = route.query
      if (query) {
        redirect.value = query.redirect
        otherQuery = Object.assign(otherQuery, getOtherQuery(query))
      }
    })
    // 聚焦功能
    onMounted(() => {
      otherQuery = Object.assign(otherQuery, { a: 1 })
      if (loginForm.username === '') {
        username.value?.focus()
      } else if (loginForm.password === '') {
        password.value?.focus()
      }
    })

    const showPwd = () => {
      if (passwordType.value === 'password') {
        passwordType.value = ''
      } else {
        passwordType.value = 'password'
      }
      nextTick(() => {
        password.value?.focus()
      })
    }

    const loginFormData = ref<typeof ElForm>()
    const handleLogin = () => {
      loginFormData.value?.validate((valid: any) => {
        if (valid) {
          loading.value = true
          store
            .dispatch('user/login', loginForm)
            .then(() => {
              router.push({ path: redirect.value || '/', query: otherQuery })
              loading.value = false
            })
            .catch(() => {
              loading.value = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    return {
      loginForm,
      loginRules,
      passwordType,
      capsTooltip,
      loading,
      showDialog,
      redirect,
      otherQuery,
      username,
      password,
      showPwd,
      handleLogin,
      loginFormData
    }
  }
})
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
