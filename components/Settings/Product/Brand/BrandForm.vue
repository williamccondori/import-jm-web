<template>
  <el-dialog
    :title="activeBrand ? `Editar marca` : `Nueva marca`"
    :visible.sync="modalBrand"
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
        <el-form-item prop="name" label="Nombre de la marca:">
          <el-input v-model="model.name" type="text" />
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
  name: ''
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
    ...mapState(['activeBrand']),
    modalBrand: {
      get() {
        return this.$store.state.modalBrand
      },
      set(value) {
        this.$store.commit('SET_MODAL_BRAND', value)
      }
    }
  },
  watch: {
    async modalBrand() {
      if (this.activeBrand) {
        const { data } = await this.$axios.get(`brands/${this.activeBrand}`)
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getBrands', 'getModels']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeBrand) {
          await this.$axios.patch(`brands/${this.activeBrand}`, this.model)
        } else {
          await this.$axios.post(`brands`, this.model)
        }
        await this.getBrands()
        await this.getModels()
        this.modalBrand = false
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
