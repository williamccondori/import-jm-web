<template>
  <div>
    <h2 class="sub-title">PRODUCTOS</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nuevo producto</el-button
    >
    <el-table :data="products" size="mini">
      <el-table-column prop="code" label="Código" sortable />
      <el-table-column prop="brand" label="Marca" sortable>
        <template slot-scope="scope">
          <el-tag type="warning" size="small" disable-transitions>{{
            scope.row.brand.name
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="model" label="Model" sortable>
        <template slot-scope="scope">
          <el-tag type="warning" size="small" disable-transitions>{{
            scope.row.model.name
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre" sortable />
      <el-table-column prop="isEnabled" label="¿Está habilitado?" sortable>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEnabled"
            active-color="#13ce66"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operaciones">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            round
            @click="handleEdit(scope.row)"
          >
            Editar
          </el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            round
            @click="handleDelete(scope.row)"
          >
            Eliminar
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  async fetch() {
    try {
      await this.getProducts()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['products']),
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
    ...mapActions(['getProducts', 'activateProduct']),
    handleCreate() {
      this.activateProduct(null)
      this.modalProduct = true
    },
    handleEdit(row) {
      this.activateProduct(row.id)
      this.modalProduct = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
