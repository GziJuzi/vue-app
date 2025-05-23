<template>
  <div class="container mt-5" style="max-width: 400px;">
    <el-card shadow class="login-card">
      <h4 class="text-center mb-4">Login</h4>

      <el-form :model="form" :rules="rules" ref="loginForm" label-position="top" @submit.native.prevent="handleLogin">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" autocomplete="username" placeholder="Enter username" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="current-password"
            placeholder="Enter password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" native-type="submit" style="width: 100%;">
            {{ loading ? 'Logging in...' : 'Login' }}
          </el-button>
        </el-form-item>

        <el-alert v-if="error" type="error" :closable="false" class="mt-3" :title="error" show-icon />
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { api } from '@/utils/axios'
import { setToken, setUserId, setUserName } from '@/utils/user'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false,
      error: '',
      rules: {
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.error = ''
      const loginForm = this.$refs.loginForm as any
      loginForm.validate((valid: boolean) => {
        if (!valid) return

        this.loading = true
        api.post('/Auth/login', {
          username: this.form.username,
          password: this.form.password
        })
          .then(res => {
            const data = res.data
            setToken(data.token)
            setUserId(data.user.id)
            setUserName(data.user.name)
            this.$router.push('/')
          })
          .catch(err => {
            console.error('Login failed', err)
            this.error = 'Invalid username or password'
          })
          .finally(() => {
            this.loading = false
          })
      })
    }
  }
})
</script>

<style scoped>
.login-card {
  padding: 20px;
}
</style>
