<template>
  <div class="layout-container">
    <TopLoadingBar ref="loadingBar" />
    <el-container>
      <div class="sidebar">
        <NavBar />
      </div>
      <div class="main-content">
        <header class="text-center">
          <h1 class="mb-3">{{ pageTitle }}</h1>
        </header>
        <router-view />
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import TopLoadingBar from '@/components/TopLoadingBar.vue'
import type { TopLoadingBarExposed } from '@/components/TopLoadingBar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppLayout',
  components: {
    NavBar,
    TopLoadingBar
  },
  data() {
    return {
      pageTitle: '',
      unregisterHooks: [] as Array<() => void>
    }
  },
  watch: {
    $route(to) {
      this.pageTitle = (to.meta.title as string) || 'Default Title'
    }
  },
  created() {
    this.pageTitle = (this.$route.meta.title as string) || 'Default Title'
  },
  mounted() {
    const router = useRouter()
    const loadingBar = this.$refs.loadingBar as TopLoadingBarExposed

    // Register navigation guards correctly
    const unregisterBefore = router.beforeEach((to, from, next) => {
      loadingBar?.start()
      next()
    })

    const unregisterAfter = router.afterEach(() => {
      // Add delay to simulate async work or give time for visual effect
      setTimeout(() => {
        loadingBar?.finish()
      }, 200) // adjust this to improve the visual "completion" feel
    })

    // Store unregister functions correctly (don't call them here)
    this.unregisterHooks.push(unregisterBefore, unregisterAfter)
  },
  beforeUnmount() {
    // Properly unregister all hooks
    this.unregisterHooks.forEach(unregister => unregister())
  }
})
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.sidebar {
  flex: 1;
  min-width: 200px;
  /* Optional: to avoid too narrow sidebar on small screens */
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  height: 100%;
}

.main-content {
  flex: 9;
  padding: 20px;
  overflow-y: auto;
}
</style>
