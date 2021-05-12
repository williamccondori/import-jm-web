<template>
  <el-dialog
    :title="
      activeDocumentType
        ? `Editar tipo de documento`
        : `Nuevo tipo de documento`
    "
    :visible.sync="modalDocumentType"
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
        <el-form-item prop="lenght" label="Número de dígitos:">
          <el-input v-model="model.lenght" type="number" />
        </el-form-item>
        <el-form-item prop="alias" label="Abreviatura:">
          <el-input v-model="model.alias" type="text" />
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
  lenght: 8,
  alias: '',
  isEnabled: true
}

export default {
  data() {
    return {
      model: { ...model },
      rules: {
        name: [{ required: true, message: 'Este campo es obligatorio' }],
        lenght: [{ required: true, message: 'Este campo es obligatorio' }],
        alias: [
          { required: true, message: 'Este campo es obligatorio' },
          { min: 3, max: 3, message: 'Este campo necesita de 3 caracteres' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['activeDocumentType']),
    modalDocumentType: {
      get() {
        return this.$store.state.modalDocumentType
      },
      set(value) {
        this.$store.commit('SET_MODAL_DOCUMENT_TYPE', value)
      }
    }
  },
  watch: {
    async modalDocumentType() {
      if (this.activeDocumentType) {
        const { data } = await this.$axios.get(
          `document-types/${this.activeDocumentType}`
        )
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getDocumentTypes']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeDocumentType) {
          await this.$axios.patch(
            `document-types/${this.activeDocumentType}`,
            this.model
          )
        } else {
          await this.$axios.post(`document-types`, this.model)
        }
        await this.getDocumentTypes()
        this.modalDocumentType = false
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
