<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <div id="nav">
          <el-col :span="24">
            <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">多规格选择</span>
              </el-menu-item>
              <el-menu-item index="/about">
                <i class="el-icon-document"></i>
                <span slot="title">页面效果</span>
              </el-menu-item>
              <el-menu-item index="/demo">
                <i class="el-icon-setting"></i>
                <span slot="title">前端demo</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </div>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Wrapper",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less">
#nav {
  .router-link-active {
    text-decoration: none;
  }
  .toStyle {
    text-decoration: none;
    color: #555;
    &:hover {
      color: #0af;
      cursor: pointer;
    }
  }
}
</style>
