<template>
  <el-dialog
    :title="
      activeClientType ? `Editar tipo de cliente` : `Nuevo tipo de cliente`
    "
    :visible.sync="modalClientType"
    width="40%"
  >
    <el-form
      ref="form"
      size="small"
      :rules="rules"
      :model="model"
      label-width="200px"
      label-position="left"
      @submit.native.prevent="save"
    >
      <div class="mb-1">
        <el-form-item prop="name" label="Nombre:">
          <el-input v-model="model.name" type="text" />
        </el-form-item>
        <el-form-item label="¿Está habilitado?">
          <el-switch v-model="model.isEnabled" />
        </el-form-item>
      </div>
      <div class="text-right">
        <el-button type="success" native-type="submit" block size="small" plain>
          Guardar
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const model = {
  name: '',
  isEnabled: true
}

export default {
  data() {
    return {
      model: { ...model },
      rules: {
        name: [{ required: true, message: 'Este campo es obligatorio' }]
      }
    }
  },
  computed: {
    ...mapState(['activeClientType']),
    modalClientType: {
      get() {
        return this.$store.state.modalClientType
      },
      set(value) {
        this.$store.commit('SET_MODAL_CLIENT_TYPE', value)
      }
    }
  },
  watch: {
    async modalClientType() {
      if (this.activeClientType) {
        const { data } = await this.$axios.get(
          `client-types/${this.activeClientType}`
        )
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getClientTypes']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeClientType) {
          await this.$axios.patch(
            `client-types/${this.activeClientType}`,
            this.model
          )
        } else {
          await this.$axios.post(`client-types`, this.model)
        }
        await this.getClientTypes()
        this.modalClientType = false
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
