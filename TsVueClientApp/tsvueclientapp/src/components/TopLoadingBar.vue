<template>
  <div ref="barContainer" v-if="visible" class="top-loading-bar">
    <el-progress :percentage="percentage" :indeterminate="indeterminate" :show-text="false" color="#409EFF"
      stroke-width="2" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'

export default defineComponent({
  name: 'TopLoadingBar',
  data() {
    return {
      visible: true,
      percentage: 0,
      indeterminate: true,
    }
  },
  methods: {
    start() {
      this.visible = true
      this.percentage = 0
      this.indeterminate = true
    },
    async finish() {
      this.indeterminate = false
      this.percentage = 100

      // Wait for DOM update to calculate actual width
      await nextTick()

      const container = this.$refs.barContainer as HTMLElement | undefined
      const width = container?.offsetWidth || window.innerWidth

      // Duration based on width: 1ms per pixel (or customize scale factor)
      const duration = Math.min(1000, Math.max(300, width * 0.5)) // min 300ms, max 1000ms

      setTimeout(() => {
        this.visible = false
        this.percentage = 0
        this.indeterminate = true
      }, duration)
    },
  },
})
</script>

<style scoped>
.top-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 9999;
  height: 5px;
}
</style>
