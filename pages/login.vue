<template>
  <div class="flex h-screen">
    <div class="container">
      <el-card shadow="always">
        <el-form
          ref="form"
          size="small"
          :model="model"
          @submit.native.prevent="login"
        >
          <el-form-item prop="username">
            <el-input
              v-model="model.username"
              type="text"
              prefix-icon="el-icon-user"
              placeholder="Ingrese su usuario"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="model.password"
              type="password"
              prefix-icon="el-icon-lock"
              placeholder="Ingrese su contraseña"
            />
          </el-form-item>
          <el-button type="primary" native-type="submit" block>Login</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.model
        })
      } catch ({ message }) {
        this.$notify({
          type: 'error',
          title: 'Error',
          message
        })
      }
    }
  }
}
</script>

<style>
.h-screen {
  min-height: 100vh;
}
.container {
  width: 30em;
}
</style>
