<template>
  <el-dialog
    :title="activeProduct ? `Editar producto` : `Nuevo producto`"
    :visible.sync="modalProduct"
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
        <el-form-item prop="categoryId" label="Categoría:">
          <el-select v-model="model.categoryId" placeholder="Seleccione">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="code" label="Código:">
          <el-input v-model="model.code" type="text" />
        </el-form-item>
        <el-form-item prop="name" label="Nombre:">
          <el-input v-model="model.name" type="text" />
        </el-form-item>
        <el-form-item prop="brandId" label="Marca:">
          <el-select
            v-model="model.brandId"
            placeholder="Seleccione"
            @change="handleBrandChange"
          >
            <el-option
              v-for="item in brands"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="modelId" label="Modelo:">
          <el-select v-model="model.modelId" placeholder="Seleccione">
            <el-option
              v-for="item in models"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-collapse v-model="collapse">
          <el-collapse-item title="Ver más">
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
        <el-button
          type="info"
          native-type="button"
          block
          size="small"
          plain
          @click="generateName"
        >
          Generar nombre
        </el-button>
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
  categoryId: null,
  brandId: null,
  modelId: null,
  code: '',
  name: '',
  description: '',
  isEnabled: true
}

export default {
  data() {
    return {
      collapse: [],
      models: [],
      model: { ...model },
      rules: {
        categoryId: [{ required: true, message: 'Este campo es obligatorio' }],
        code: [
          { required: true, message: 'Este campo es obligatorio' },
          { max: 100, message: 'Máximo 100 caracteres' }
        ],
        name: [
          { required: true, message: 'Este campo es obligatorio' },
          { max: 100, message: 'Máximo 100 caracteres' }
        ],
        brandId: [{ required: true, message: 'Este campo es obligatorio' }],
        modelId: [{ required: true, message: 'Este campo es obligatorio' }],
        unintId: [{ required: true, message: 'Este campo es obligatorio' }]
      }
    }
  },
  async fetch() {
    await this.getCategories()
    await this.getBrands()
  },
  computed: {
    ...mapState(['activeProduct', 'categories', 'brands']),
    modalProduct: {
      get() {
        return this.$store.state.modalProduct
      },
      set(value) {
        this.$store.commit('SET_MODAL_PRODUCT', value)
      }
    }
  },
  watch: {
    async modalProduct() {
      if (this.activeProduct) {
        const { data } = await this.$axios.get(`products/${this.activeProduct}`)
        this.model = data
      } else {
        this.reset()
      }
    }
  },
  methods: {
    ...mapActions(['getProducts', 'getCategories', 'getBrands']),
    reset() {
      if (this.$refs.form) this.$refs.form.resetFields()
      this.collapse = []
      this.model = { ...model }
    },
    async handleBrandChange() {
      try {
        const { data } = await this.$axios.get(
          `models?brand=${this.model.brandId}`
        )
        this.models = data
        this.model.modelId = null
      } catch ({ message }) {
        this.$notify({
          type: 'error',
          title: 'Error',
          message
        })
      }
    },
    generateName() {
      const brand = this.brands.filter((x) => x.id === this.model.brandId)[0]
      const model = this.models.filter((x) => x.id === this.model.modelId)[0]
      if (brand && model) {
        this.model.name = `${brand.name} ${model.name}`.toUpperCase()
      }
    },
    async save() {
      try {
        this.$refs.form.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        if (this.activeProduct) {
          await this.$axios.patch(`products/${this.activeProduct}`, this.model)
        } else {
          await this.$axios.post(`products`, this.model)
        }
        await this.getProducts()
        this.modalProduct = false
        this.$notify({
          type: 'success',
          title: 'Correcto',
          message: 'La operación de ha realizado con éxito'
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
