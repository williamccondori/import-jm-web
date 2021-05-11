<template>
  <el-dialog
    :title="activeProduct ? `Editar producto` : `Nuevo producto`"
    :visible.sync="modalProduct"
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
        <el-form-item label="Categoría:">
          <el-select v-model="model.categoryId" placeholder="Seleccione">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="Nombre del producto:">
          <el-input v-model="model.name" type="text" />
        </el-form-item>
        <el-form-item label="Marca:">
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
        <el-form-item label="Modelo:">
          <el-select v-model="model.modelId" placeholder="Seleccione">
            <el-option
              v-for="item in models"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
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
  name: '',
  description: ''
}

export default {
  data() {
    return {
      model: { ...model },
      models: []
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
        this.reset()
        return this.$store.state.modalProduct
      },
      set(value) {
        this.$store.commit('SET_MODAL_PRODUCT', value)
      }
    }
  },
  watch: {
    async activeProduct() {
      if (this.activeProduct) {
        const { data } = await this.$axios.get(`products/${this.activeProduct}`)
        this.model = data
      }
    }
  },
  methods: {
    ...mapActions(['getProducts', 'getCategories', 'getBrands']),
    reset() {
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
    save() {
      if (this.id) {
        // update
      } else {
        // create
      }
      this.$notify({
        type: 'success',
        title: 'Correcto',
        message: 'La operación de ha realizado con éxito'
      })
    }
  }
}
</script>
