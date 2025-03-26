<template>
  <div class="login">
    <el-card class="login-form">
      <template #header>
        <div class="title">心 念 Blog 后 台 管 理</div>
      </template>
      <div class="form">
        <form-render v-model="formValues" :schema ref="form" />

        <el-button style="width: 100%" type="primary" :loading @click="handleLogin">登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance, FormSchema } from 'vue-form-craft'
import { useGlobalStore } from '@/stores/global'

const router = useRouter()
const loading = ref(false)

const form = useTemplateRef<FormInstance>('form')

const globalStore = useGlobalStore()

const formValues = ref({
  username: '',
  password: '',
})

const schema = {
  labelWidth: 100,
  labelAlign: 'top',
  size: 'default',
  scrollToError: true,
  items: [
    {
      label: '用户名',
      component: 'Input',
      props: {
        placeholder: '请输入用户名',
        clearable: true,
      },
      designKey: 'form-eNR0',
      name: 'username',
      required: true,
    },
    {
      label: '密码',
      component: 'Password',
      props: {
        placeholder: '请输入密码',
      },
      designKey: 'form-D1x7',
      name: 'password',
      required: true,
    },
    {
      label: '验证码',
      component: 'VerifyCode',
      required: true,
      props: {
        placeholder: '请输入验证码',
      },
      designKey: 'design-HUBT',
      name: 'code',
    },
  ],
} satisfies FormSchema

const handleLogin = async () => {
  await form.value?.validate()
  loading.value = true

  setTimeout(() => {
    if (formValues.value.username === 'admin' && formValues.value.password === 'admin') {
      loading.value = false
      ElMessage.success('登录成功')
      router.push('/home')
      globalStore.setLoginStatus(true)
    }
  }, 1000)
}
</script>

<style lang="less">
.login {
  background-image: url('@/assets/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 15%;
  height: 100%;
  display: flex;

  .login-form {
    width: 400px;
    margin: auto;

    .title {
      font-size: 20px;
      font-weight: bold;
      font-family: 'Microsoft YaHei';
      color: brown;
      text-align: center;
    }

    .form {
      padding: 20px;
    }

    .loginBtn {
      width: 100%;
    }
  }
}
</style>
