<template>
  <el-dialog
    :title="id ? `Modificar producto` : `Nuevo producto`"
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
          <el-select v-model="value" placeholder="Seleccione">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="Nombre del producto:">
          <el-input v-model="model.name" type="text" />
        </el-form-item>
        <el-form-item label="Marca:">
          <el-select v-model="value" placeholder="Seleccione">
            <el-option
              v-for="item in brands"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Modelo:">
          <el-select v-model="value" placeholder="Seleccione">
            <el-option
              v-for="item in brands"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="text-right">
        <el-button type="info" native-type="button" block size="small" plain>
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
export default {
  props: ['id'],
  data() {
    return {
      model: {
        name: ''
      }
    }
  },
  computed: {
    modalProduct: {
      get() {
        return this.$store.state.modalProduct
      },
      set(value) {
        this.$store.commit('SET_MODAL_PRODUCT', value)
      }
    }
  },
  methods: {
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
