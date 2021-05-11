<template>
  <el-dialog
    :title="activeParameter ? `Editar parámetro` : `Nueva parámetro`"
    :visible.sync="modalParameter"
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
        <el-form-item prop="code" label="Código:">
          <el-input
            v-model="model.code"
            type="text"
            readonly="readonly"
            disabled="disabled"
          />
        </el-form-item>
        <el-form-item prop="name" label="Nombre:">
          <el-input v-model="model.name" type="text" />
        </el-form-item>
        <el-form-item prop="value" label="Valor:">
          <el-input v-model="model.value" type="text" />
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
  code: '',
  name: '',
  value: ''
}

export default {
  data() {
    return {
      model: { ...model },
      rules: {
        name: [{ required: true, message: 'Este campo es obligatorio' }],
        value: [{ required: true, message: 'Este campo es obligatorio' }]
      }
    }
  },
  computed: {
    ...mapState(['activeParameter']),
    modalParameter: {
      get() {
        return this.$store.state.modalParameter
      },
      set(value) {
        this.$store.commit('SET_MODAL_PARAMETER', value)
      }
    }
  },
  watch: {
    async modalParameter() {
      if (this.activeParameter) {
        const { data } = await this.$axios.get(
          `parameters/${this.activeParameter}`
        )
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getParameters']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeParameter) {
          await this.$axios.patch(
            `parameters/${this.activeParameter}`,
            this.model
          )
        } else {
          await this.$axios.post(`parameters`, this.model)
        }
        await this.getParameters()
        this.modalParameter = false
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
