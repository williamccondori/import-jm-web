<template>
  <div>
    <h2 class="sub-title">PARÁMETROS</h2>
    <el-table :data="parameters" size="mini">
      <el-table-column prop="code" label="Código" sortable>
        <template slot-scope="scope">
          <el-tag size="small" disable-transitions>{{ scope.row.code }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre" sortable />
      <el-table-column prop="value" label="Valor" />
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
      await this.getParameters()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['parameters']),
    modalParameter: {
      get() {
        return this.$store.state.modalParameter
      },
      set(value) {
        this.$store.commit('SET_MODAL_PARAMETER', value)
      }
    }
  },
  methods: {
    ...mapActions(['getParameters', 'activateParameter']),
    handleCreate() {
      this.activateParameter(null)
      this.modalParameter = true
    },
    handleEdit(row) {
      this.activateParameter(row.code)
      this.modalParameter = true
    }
  }
}
</script>
