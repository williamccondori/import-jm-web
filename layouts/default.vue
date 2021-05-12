<template>
  <el-container class="h-screen">
    <el-container>
      <el-aside width="300px">
        <el-menu
          class="h-full"
          text-color="#fff"
          default-active="index"
          background-color="#263238"
          active-text-color="#00bcd4"
          @select="selectMenu"
        >
          <el-menu-item index="index">
            <i class="el-icon-house" />
            <span>Inicio</span>
          </el-menu-item>
          <el-menu-item index="providers">
            <i class="el-icon-truck" />
            <span>Proveedores</span>
          </el-menu-item>
          <el-menu-item index="clients">
            <i class="el-icon-suitcase" />
            <span>Clientes</span>
          </el-menu-item>
          <el-menu-item index="products">
            <i class="el-icon-notebook-1" />
            <span>Productos</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-box" />
              <span>Órdenes</span>
            </template>
            <el-menu-item-group title="Compras">
              <el-menu-item index="orders">
                <span>Realizar órden</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-shopping-cart-full" />
              <span>Ventas</span>
            </template>
            <el-menu-item-group title="Ventas">
              <el-menu-item index="sales">
                <span>Realizar venta</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="settings">
            <i class="el-icon-setting" />
            <span>Configuraciones</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
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
.mb-1 {
  margin-bottom: 1em;
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
.el-form-item__label {
  font-size: 0.8rem;
  font-weight: bolder;
}
.el-select {
  width: 100%;
}
.el-card,
.el-button,
.el-message,
.el-input__inner {
  border-radius: 0;
}
.el-menu-item i,
.el-submenu__title i {
  color: #90a4ae;
}
.el-menu-item-group__title {
  color: #90a4ae;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
}
</style>
