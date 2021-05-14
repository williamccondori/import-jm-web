<template>
  <el-dialog
    :title="activeLocation ? `Editar sucursal` : `Nueva sucursal`"
    :visible.sync="modalLocation"
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
        <el-form-item prop="address" label="Dirección:">
          <el-input v-model="model.address" type="text" />
        </el-form-item>
        <el-collapse v-model="collapse">
          <el-collapse-item title="Ver más">
            <el-form-item prop="addressReference" label="Referencia:">
              <el-input v-model="model.addressReference" type="text" />
            </el-form-item>
            <el-form-item prop="phone" label="Teléfono:">
              <el-input v-model="model.phone" type="text" />
            </el-form-item>
            <el-form-item label="¿Está habilitado?">
              <el-switch v-model="model.isEnabled" />
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
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
  address: '',
  addressReference: '',
  phone: '',
  isEnabled: true
}

export default {
  data() {
    return {
      collapse: [],
      model: { ...model },
      rules: {
        name: [
          { required: true, message: 'Este campo es obligatorio' },
          { max: 100, message: 'Máximo 100 caracteres' }
        ],
        address: [
          { required: true, message: 'Este campo es obligatorio' },
          { max: 100, message: 'Máximo 100 caracteres' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['activeLocation']),
    modalLocation: {
      get() {
        return this.$store.state.modalLocation
      },
      set(value) {
        this.$store.commit('SET_MODAL_LOCATION', value)
      }
    }
  },
  watch: {
    async modalLocation() {
      this.collapse = []
      if (this.activeLocation) {
        const { data } = await this.$axios.get(
          `locations/${this.activeLocation}`
        )
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getLocations']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeLocation) {
          await this.$axios.patch(
            `locations/${this.activeLocation}`,
            this.model
          )
        } else {
          await this.$axios.post(`locations`, this.model)
        }
        await this.getLocations()
        this.modalLocation = false
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
