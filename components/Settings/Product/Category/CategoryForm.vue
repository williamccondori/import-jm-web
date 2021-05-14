<template>
  <el-dialog
    :title="activeCategory ? `Editar categoría` : `Nueva categoría`"
    :visible.sync="modalCategory"
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
    ...mapState(['activeCategory']),
    modalCategory: {
      get() {
        return this.$store.state.modalCategory
      },
      set(value) {
        this.$store.commit('SET_MODAL_CATEGORY', value)
      }
    }
  },
  watch: {
    async modalCategory() {
      if (this.activeCategory) {
        const { data } = await this.$axios.get(
          `categories/${this.activeCategory}`
        )
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getCategories']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.model = { ...model }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeCategory) {
          await this.$axios.patch(
            `categories/${this.activeCategory}`,
            this.model
          )
        } else {
          await this.$axios.post(`categories`, this.model)
        }
        await this.getCategories()
        this.modalCategory = false
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
