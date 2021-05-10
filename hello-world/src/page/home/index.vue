<template>
  <div class="index" id="home">
    <section class="device"></section>
    <section class="sidebar">
      <sidebar class="sidebar-container"></sidebar>
    </section>
    <section class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 头部导航路由 -->
        <nav-menu></nav-menu>
      </div>
      <!-- 内部页面展示 -->
      <div class="app-main">
        <app-main></app-main>
      </div>
    </section>
  </div>
</template>

<script>
import Sidebar from "./sidebar";
import navMenu from "./navMenu";

import AppMain from './appMain.vue';
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
  components: {
    Sidebar,
    navMenu,
    AppMain
  },
  computed: {
    fixedHeader() {
      return false;
    },
  },
};
</script>
<style lang="scss">
@import "../../setting/variables";
@import "../../setting/variables";

#home {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    background-color: $menuBg;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }
    .submenu-title-noDropdown,
    .el-submenu__title {
      &:hover {
        background-color: $menuHover !important;
      }
    }
    .is-active > .el-submenu__title {
      color: $subMenuActiveText !important;
    }

    & .nest-menu .el-submenu > .el-submenu__title,
    & .el-submenu .el-menu-item {
      min-width: $sideBarWidth !important;
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }
}
</style>



