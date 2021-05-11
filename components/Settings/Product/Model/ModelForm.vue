<template>
  <el-dialog
    :title="activeModel ? `Editar modelo` : `Nuevo modelo`"
    :visible.sync="modalModel"
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
        <el-form-item prop="brandId" label="Marca:">
          <el-select v-model="model.brandId" placeholder="Seleccione">
            <el-option
              v-for="item in brands"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="Nombre:">
          <el-input v-model="model.name" type="text" />
        </el-form-item>
        <el-form-item prop="description" label="Descripción:">
          <el-input v-model="model.description" type="text" />
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
  brandId: null,
  name: '',
  description: ''
}

export default {
  data() {
    return {
      model: { ...model },
      rules: {
        brandId: [{ required: true, message: 'Este campo es obligatorio' }],
        name: [{ required: true, message: 'Este campo es obligatorio' }]
      }
    }
  },
  async fetch() {
    await this.getBrands()
  },
  computed: {
    ...mapState(['activeModel', 'brands']),
    modalModel: {
      get() {
        return this.$store.state.modalModel
      },
      set(value) {
        this.$store.commit('SET_MODAL_MODEL', value)
      }
    }
  },
  watch: {
    async modalModel() {
      if (this.activeModel) {
        const { data } = await this.$axios.get(`models/${this.activeModel}`)
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getModels', 'getBrands']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeModel) {
          await this.$axios.patch(`models/${this.activeModel}`, this.model)
        } else {
          await this.$axios.post(`models`, this.model)
        }
        await this.getModels()
        this.modalModel = false
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
