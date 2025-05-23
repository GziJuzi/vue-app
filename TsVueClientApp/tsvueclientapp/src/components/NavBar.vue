<template>
  <el-menu class="sidebar-menu" :default-active="$route.path" router background-color="#f5f7fa" text-color="#303133"
    active-text-color="#409EFF" unique-opened mode="vertical">
    <!-- Sticky top greeting -->
    <div class="sticky-top user-greeting ps-3" v-if="isAuthenticated">
      <el-text class="mx-1 fw-bold" size="large">您好，{{ userName }}</el-text>
    </div>

    <!-- Scrollable menu items -->
    <div class="menu-scroll">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
      <el-menu-item :index="`/users/${userId}`">Profile</el-menu-item>

      <!-- Multi-level menu -->
      <el-sub-menu index="management">
        <template #title>
          <!-- <i class="bi bi-gear me-2"></i>  -->Management
        </template>
        <el-menu-item index="/management/users">Users</el-menu-item>
        <el-menu-item index="/management/settings">Settings</el-menu-item>
      </el-sub-menu>
    </div>

    <!-- Sticky bottom logout -->
    <div class="sticky-bottom logout-section" v-if="isAuthenticated">
      <el-menu-item index="logout" @click="handleLogout">
        <i class="bi bi-box-arrow-left me-2"></i> Logout
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  getToken,
  getUserName,
  getUserId,
  clearUserData
} from '@/utils/user'

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      userId: null as string | null,
      userName: null as string | null,
      isAuthenticated: false
    }
  },
  created() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      const token = getToken()
      this.userName = getUserName()
      this.userId = getUserId()
      this.isAuthenticated = !!token
    },
    handleLogout() {
      clearUserData()
      this.loadUser()
      this.$router.push('/login')
    }
  }
})
</script>

<style scoped>
.sidebar-menu {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

/* Sticky top section */
.sticky-top {
  position: sticky;
  top: 0;
  background: #f5f7fa;
  z-index: 10;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dcdfe6;
}

/* Scrollable middle menu */
.menu-scroll {
  flex: 1;
  overflow-y: auto;
  margin: 1rem 0;
}

/* Sticky bottom logout */
.sticky-bottom {
  position: sticky;
  bottom: 0;
  background: #f5f7fa;
  z-index: 10;
  border-top: 1px solid #dcdfe6;
  padding-top: 1rem;
}
</style>
