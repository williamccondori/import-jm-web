<template>
  <el-dialog
    :title="activeUnit ? `Editar unidad` : `Nueva unidad`"
    :visible.sync="modalUnit"
    width="40%"
  >
    <el-form
      ref="form"
      size="small"
      :model="model"
      label-width="200px"
      label-position="left"
      @submit.native.prevent="save"
    >
      <div class="mb-1">
        <el-form-item prop="code" label="Código de la unidad:">
          <el-input v-model="model.code" type="text" />
        </el-form-item>
        <el-form-item prop="name" label="Nombre de la unidad:">
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
  code: '',
  name: ''
}

export default {
  data() {
    return {
      model
    }
  },
  computed: {
    ...mapState(['activeUnit']),
    modalUnit: {
      get() {
        return this.$store.state.modalUnit
      },
      set(value) {
        this.$store.commit('SET_MODAL_UNIT', value)
      }
    }
  },
  watch: {
    async activeUnit() {
      this.reset()
      if (this.activeUnit) {
        const { data } = await this.$axios.get(`units/${this.activeUnit}`)
        this.model = data
      }
    }
  },
  methods: {
    ...mapActions(['getUnits']),
    reset() {
      this.model = model
    },
    async save() {
      try {
        if (this.activeUnit) {
          await this.$axios.patch(`units/${this.activeUnit}`, this.model)
        } else {
          await this.$axios.post(`units`, this.model)
        }
        await this.getUnits()
        this.modalUnit = false
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
