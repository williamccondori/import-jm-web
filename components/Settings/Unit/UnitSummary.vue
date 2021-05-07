<template>
  <div>
    <h2 class="sub-title">UNIDADES</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nueva unidad</el-button
    >
    <el-table :data="units">
      <el-table-column prop="code" label="Código">
        <template slot-scope="scope">
          <el-tag type="info" disable-transitions>{{ scope.row.code }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nombre" />
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
      await this.getUnits()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['units']),
    modalUnit: {
      get() {
        return this.$store.state.modalUnit
      },
      set(value) {
        this.$store.commit('SET_MODAL_UNIT', value)
      }
    }
  },
  methods: {
    ...mapActions(['getUnits', 'activateUnit']),
    handleCreate() {
      this.activateUnit(null)
      this.modalUnit = true
    },
    handleEdit(row) {
      this.activateUnit(row.code)
      this.modalUnit = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
