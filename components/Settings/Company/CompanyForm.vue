<template>
  <div>
    <h2 class="sub-title">MI EMPRESA</h2>
    <el-form
      ref="form"
      size="small"
      :rules="rules"
      :model="model"
      @submit.native.prevent="save"
    >
      <div class="mb-1">
        <el-form-item prop="documentNumber" label="RUC:">
          <el-input
            v-model="model.documentNumber"
            disabled
            readonly
            type="text"
          >
            <template slot="prepend">
              <el-switch
                v-model="model.documentStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="businessName" label="Razón social:">
          <el-input v-model="model.businessName" type="text" />
        </el-form-item>
        <el-form-item prop="name" label="Nombre:">
          <el-input v-model="model.name" type="text" />
        </el-form-item>
        <el-form-item prop="address" label="Dirección:">
          <el-input v-model="model.address" type="text" />
        </el-form-item>
        <el-form-item prop="addressReference" label="Referencia:">
          <el-input v-model="model.addressReference" type="text" />
        </el-form-item>
        <el-form-item prop="comercialActivity" label="Actividad comercial:">
          <el-input v-model="model.comercialActivity" type="text" />
        </el-form-item>
        <el-form-item prop="phone" label="Teléfono:">
          <el-input v-model="model.phone" type="text" />
        </el-form-item>
      </div>
      <el-button
        block
        plain
        type="info"
        size="small"
        native-type="button"
        @click="reset"
      >
        Cancelar
      </el-button>
      <el-button type="success" native-type="submit" block size="small" plain>
        Guardar
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      rules: {
        name: [{ required: true, message: 'Este campo es obligatorio' }],
        businessName: [
          { required: true, message: 'Este campo es obligatorio' }
        ],
        address: [{ required: true, message: 'Este campo es obligatorio' }]
      }
    }
  },
  async fetch() {
    try {
      await this.getCompany()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  methods: {
    async reset() {
      try {
        if (this.$refs.form) this.$refs.form.resetFields()
        const { data } = await this.$axios.get(`companies`)
        this.model = data
      } catch ({ message }) {
        this.$notify({
          type: 'error',
          title: 'Error',
          message
        })
      }
    },
    async getCompany() {
      const { data } = await this.$axios.get(`companies`)
      this.model = data
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        await this.$axios.patch(`companies/${this.model.id}`, this.model)
        await this.getCompany()
        this.$notify({
          type: 'success',
          title: 'Correcto',
          message: 'La operación se ha realizado con éxito'
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

<style scoped>
.flex-form {
  display: flex;
}
</style>
