<template>
  <el-container class="h-screen">
    <el-aside width="300px">
      <el-menu
        class="h-full"
        default-active="1"
        text-color="#fff"
        background-color="#153a73"
        active-text-color="#00bcd4"
        @open="handleOpen"
        @close="handleClose"
        @select="selectMenu"
      >
        <el-menu-item index="index">
          <i class="el-icon-house" />
          <span>Inicio</span>
        </el-menu-item>
        <el-menu-item index="products">
          <i class="el-icon-reading" />
          <span>Productos</span>
        </el-menu-item>
        <el-menu-item index="sales">
          <i class="el-icon-bank-card" />
          <span>Ventas</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu" />
            <span>Inventarios</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-menu" />
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-document" />
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="settings">
          <i class="el-icon-setting" />
          <span>Configuraciones</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!--
      <el-header>Cabecera</el-header>
      -->
      <el-main>
        <Nuxt />
      </el-main>
      <el-footer class="footer">
        <span class="copy"
          >📝 Desarrollado con 💙 por
          <a href="https://veox.tech/" target="_blank">VEOX</a></span
        >
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    selectMenu(index) {
      this.$router.push({
        name: index
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.h-screen {
  min-height: 100vh;
}
.h-full {
  height: 100%;
}
.text-right {
  text-align: right;
}
.el-card,
.el-button,
.el-message,
.el-input__inner {
  border-radius: 0;
}
.el-menu-item i,
.el-submenu__title i {
  color: #fff;
}
.el-menu-item-group__title {
  color: #9fa8da;
}
.footer {
  height: 30px !important;
}
.sub-title {
  font-size: 1em;
  font-weight: bolder;
}
.copy {
  color: #90a4ae;
  font-size: 0.8em;
  font-weight: bolder;
}
</style>
