<template>
  <div>
    <h2 class="sub-title">SUCURSALES</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nueva sucursal</el-button
    >
    <el-table :data="locations" size="mini">
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
      await this.getLocations()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['locations']),
    modalLocation: {
      get() {
        return this.$store.state.modalLocation
      },
      set(value) {
        this.$store.commit('SET_MODAL_LOCATION', value)
      }
    }
  },
  methods: {
    ...mapActions(['getLocations', 'activateLocation']),
    handleCreate() {
      this.activateLocation(null)
      this.modalLocation = true
    },
    handleEdit(row) {
      this.activateLocation(row.id)
      this.modalLocation = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
