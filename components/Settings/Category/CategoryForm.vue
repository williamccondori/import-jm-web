<template>
  <el-dialog
    :title="id ? `Modificar categoría` : `Nueva categoría`"
    :visible.sync="modalCategory"
    width="30%"
  >
    <el-form
      ref="form"
      size="small"
      :model="model"
      @submit.native.prevent="save"
    >
      <el-form-item prop="name" label="Nombre de la categoría">
        <el-input v-model="model.name" type="text" />
      </el-form-item>
      <div class="text-right">
        <el-button type="success" native-type="submit" block>
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
    modalCategory: {
      get() {
        return this.$store.state.modalCategory
      },
      set(value) {
        this.$store.commit('SET_MODAL_CATEGORY', value)
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
