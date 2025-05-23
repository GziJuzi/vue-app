<template>
  <div class="container mt-5">
    <main class="text-start">
      <p class="lead">Welcome, {{ userName }}!</p>
      <!-- your home content -->
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getUserName } from '@/utils/user'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      userName: getUserName() || 'Guest'
    }
  }
})
</script>
