<template>
  <div>
    <h2 class="sub-title">GÉNEROS</h2>
    <el-button type="primary" plain size="mini" @click="handleCreate"
      >Nuevo género</el-button
    >
    <el-table :data="genders" size="mini">
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
      await this.getGenders()
    } catch ({ message }) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message
      })
    }
  },
  computed: {
    ...mapState(['genders']),
    modalGender: {
      get() {
        return this.$store.state.modalGender
      },
      set(value) {
        this.$store.commit('SET_MODAL_GENDER', value)
      }
    }
  },
  methods: {
    ...mapActions(['getGenders', 'activateGender']),
    handleCreate() {
      this.activateGender(null)
      this.modalGender = true
    },
    handleEdit(row) {
      this.activateGender(row.id)
      this.modalGender = true
    },
    handleDelete(row) {
      // console.log(row)
    }
  }
}
</script>
