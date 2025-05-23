<template>
  <div class="container mt-5" style="max-width: 600px;">
    <div class="card">
      <div class="card-body">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" status-icon>
          <el-form-item label="User ID">
            <span>{{ userId }}</span>
          </el-form-item>

          <el-form-item label="User Name">
            <span>{{ userName }}</span>
          </el-form-item>

          <el-form-item label="Phone" prop="phone">
            <el-input v-model="form.phone" placeholder="Enter phone number" />
          </el-form-item>

          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" placeholder="Enter email" />
          </el-form-item>

          <el-form-item label="Address" prop="address">
            <el-input type="textarea" v-model="form.address" rows="3" placeholder="Enter address" />
          </el-form-item>

          <el-form-item>
            <el-alert v-if="error" title="Error" type="error" :closable="false" class="mb-4" />
            <el-button type="success" :loading="loading" @click="saveUserDetails">
              Save
            </el-button>
            <el-button class="ms-3" @click="reloadPage">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserName } from '@/utils/user'
import { api } from '@/utils/axios'
import Swal from 'sweetalert2'

export default defineComponent({
  name: 'UserDetailPage',
  setup() {
    const route = useRoute()
    const userId = (route.params.id as string) || ''
    const userName = getUserName() || 'Unknown'

    const form = reactive({
      phone: '',
      email: '',
      address: '',
    })

    const loading = ref(false)
    const error = ref('')

    const formRef = ref()

    const rules = {
      phone: [
        {
          required: false,
          message: 'Phone is optional',
          trigger: 'blur',
        },
      ],
      email: [
        { required: false, message: 'Email is optional', trigger: 'blur' },
        {
          type: 'email',
          message: 'Please enter a valid email address',
          trigger: ['blur', 'change'],
        },
      ],
      address: [
        {
          required: false,
          message: 'Address is optional',
          trigger: 'blur',
        },
      ],
    }

    const fetchUserDetails = async () => {
      loading.value = true
      error.value = ''
      try {
        const res = await api.get(`/users/${userId}`)
        const user = res.data

        form.phone = user.phone || ''
        form.email = user.email || ''
        form.address = user.address || ''
      } catch (err) {
        error.value = 'Failed to load user details'
        Swal.fire('Failed!', 'Failed to load user details', 'error')
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const saveUserDetails = () => {
      error.value = ''
      formRef.value.validate(async (valid: boolean) => {
        if (!valid) {
          return
        }
        loading.value = true
        try {
          await api.put(`/users/${userId}`, {
            phone: form.phone,
            email: form.email,
            address: form.address,
          })
          Swal.fire('Success!', 'User details saved successfully', 'success')
        } catch (err) {
          error.value = 'Failed to save user details'
          console.error(err)
        } finally {
          loading.value = false
        }
      })
    }

    const reloadPage = () => {
      window.location.reload()
    }

    if (userId) {
      fetchUserDetails()
    } else {
      error.value = 'User ID is missing'
    }

    return {
      userId,
      userName,
      form,
      rules,
      loading,
      error,
      saveUserDetails,
      reloadPage,
      formRef,
    }
  },
})
</script>
