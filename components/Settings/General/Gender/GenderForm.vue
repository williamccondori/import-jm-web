<template>
  <el-dialog
    :title="activeGender ? `Editar género` : `Nuevo género`"
    :visible.sync="modalGender"
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
    ...mapState(['activeGender']),
    modalGender: {
      get() {
        return this.$store.state.modalGender
      },
      set(value) {
        this.$store.commit('SET_MODAL_GENDER', value)
      }
    }
  },
  watch: {
    async modalGender() {
      if (this.activeGender) {
        const { data } = await this.$axios.get(`genders/${this.activeGender}`)
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getGenders']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeGender) {
          await this.$axios.patch(`genders/${this.activeGender}`, this.model)
        } else {
          await this.$axios.post(`genders`, this.model)
        }
        await this.getGenders()
        this.modalGender = false
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
