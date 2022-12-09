<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="1"
        router
        class="el-menu-vertical-demo">
      <el-menu-item index="/movie">
        <el-icon><IconMenu /></el-icon>
        电影查询
      </el-menu-item>
      <el-menu-item index="/relationship">
        <el-icon><document /></el-icon>
        关系查询
      </el-menu-item>
      <el-menu-item index="/origin">
        <el-icon><Location /></el-icon>
        溯源查询
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
export default {
  name: "t_Aside",
  components: {
    Document,
    IconMenu,
    Location,
    Setting,
  }
}
</script>

<style scoped>

</style>
