<template>
  <el-dialog
    :title="activeProvider ? `Editar proveedor` : `Nuevo proveedor`"
    :visible.sync="modalProvider"
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
        <el-form-item prop="documentTypeId" label="Tipo de documento:">
          <el-select v-model="model.documentTypeId" placeholder="Seleccione">
            <el-option
              v-for="item in documentTypes"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="documentNumber" label="Número de documento:">
          <el-input v-model="model.documentNumber" type="text" />
        </el-form-item>
        <el-form-item prop="legalName" label="Nombre legal:">
          <el-input v-model="model.legalName" type="text" />
        </el-form-item>
        <el-form-item prop="address" label="Dirección:">
          <el-input v-model="model.address" type="text" />
        </el-form-item>
        <el-collapse v-model="collapse">
          <el-collapse-item title="Ver más">
            <el-form-item prop="alias" label="Alias:">
              <el-input v-model="model.alias" type="text" />
            </el-form-item>
            <el-form-item prop="phone" label="Número de teléfono:">
              <el-input v-model="model.phone" type="phone" />
            </el-form-item>
            <el-form-item prop="email" label="Correo electrónico:">
              <el-input v-model="model.email" type="email" />
            </el-form-item>
            <el-form-item prop="description" label="Datos adicionales:">
              <el-input v-model="model.description" type="text" />
            </el-form-item>
            <el-form-item prop="isEnabled" label="¿Está habilitado?">
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
import { mapState, mapActions, mapGetters } from 'vuex'

const model = {
  documentTypeId: null,
  documentNumber: '',
  legalName: '',
  address: '',
  clientTypeId: null,
  alias: '',
  genderId: null,
  phone: '',
  email: '',
  description: '',
  isEnabled: true
}

export default {
  data() {
    return {
      collapse: [],
      model: { ...model },
      rules: {
        documentTypeId: [
          { required: true, message: 'Este campo es obligatorio' }
        ],
        documentNumber: [
          { required: true, message: 'Este campo es obligatorio' },
          { max: 50, message: 'Máximo 50 caracteres' }
        ],
        legalName: [
          { required: true, message: 'Este campo es obligatorio' },
          { max: 100, message: 'Máximo 100 caracteres' }
        ],
        address: [
          { required: true, message: 'Este campo es obligatorio' },
          { max: 200, message: 'Máximo 200 caracteres' }
        ],
        email: [
          {
            type: 'email',
            message: 'Debe incluir @ y un dominio .com o símilar'
          }
        ]
      }
    }
  },
  async fetch() {
    await this.getDocumentTypes()
  },
  computed: {
    ...mapState(['activeProvider']),
    ...mapGetters(['documentTypes']),
    modalProvider: {
      get() {
        return this.$store.state.modalProvider
      },
      set(value) {
        this.$store.commit('SET_MODAL_PROVIDER', value)
      }
    }
  },
  watch: {
    async modalProvider() {
      this.collapse = []
      if (this.activeProvider) {
        const { data } = await this.$axios.get(
          `providers/${this.activeProvider}`
        )
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getProviders', 'getDocumentTypes']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    /** 
    getDocumentValidation() {
      if (this.documentTypes) {
        const documentType = this.documentTypes.filter(
          (x) => x.id === this.client.documentTypeId
        )[0]
        if (!documentType) return
        this.rules.documentNumber.push({
          max: documentType.lenght,
          message: `Máximo ${documentType.lenght} caracteres`
        })
      }
    }, */
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeProvider) {
          await this.$axios.patch(
            `providers/${this.activeProvider}`,
            this.model
          )
        } else {
          await this.$axios.post(`providers`, this.model)
        }
        await this.getProviders()
        this.modalProvider = false
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
