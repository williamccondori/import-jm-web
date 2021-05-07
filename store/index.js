export const state = () => ({
  // ANCHOR : Products states
  products: [],
  activeProduct: null,
  modalProduct: false,
  // ANCHOR : Settings states
  // units
  units: [],
  activeUnit: null,
  modalUnit: false,
  // categories
  categories: [],
  activeCategory: null,
  modalCategory: false,
  // brands
  brands: [],
  activeBrand: null,
  modalBrand: false,
  // models
  models: [],
  activeModel: null,
  modalModel: false
})

export const actions = {
  // ANCHOR : Products actions
  async getProducts({ commit }) {
    const { data } = await this.$axios.get('products')
    commit('SET_PRODUCTS', data)
  },
  activateProduct({ commit }, productId) {
    commit('SET_ACTIVE_PRODUCT', productId)
  },
  // ANCHOR : Settings actions
  // units
  async getUnits({ commit }) {
    const { data } = await this.$axios.get('units')
    commit('SET_UNITS', data)
  },
  activateUnit({ commit }, unitId) {
    commit('SET_ACTIVE_UNIT', unitId)
  },
  // categories
  async getCategories({ commit }) {
    const { data } = await this.$axios.get('categories')
    commit('SET_CATEGORIES', data)
  },
  activateCategory({ commit }, categoryId) {
    commit('SET_ACTIVE_CATEGORY', categoryId)
  },
  // brands
  async getBrands({ commit }) {
    const { data } = await this.$axios.get('brands')
    commit('SET_BRANDS', data)
  },
  activateBrand({ commit }, brandId) {
    commit('SET_ACTIVE_BRAND', brandId)
  },
  // models
  async getModels({ commit }) {
    const { data } = await this.$axios.get('models')
    commit('SET_MODELS', data)
  },
  activateModel({ commit }, modelId) {
    commit('SET_ACTIVE_MODEL', modelId)
  }
}

export const mutations = {
  // ANCHOR : Products mutations
  SET_PRODUCTS: (state, payload) => (state.products = payload),
  SET_ACTIVE_PRODUCT: (state, payload) => (state.activeProduct = payload),
  SET_MODAL_PRODUCT: (state, payload) => (state.modalProduct = payload),
  // ANCHOR : Settings mutations
  // units
  SET_UNITS: (state, payload) => (state.units = payload),
  SET_ACTIVE_UNIT: (state, payload) => (state.activeUnit = payload),
  SET_MODAL_UNIT: (state, payload) => (state.modalUnit = payload),
  // categories
  SET_CATEGORIES: (state, payload) => (state.categories = payload),
  SET_ACTIVE_CATEGORY: (state, payload) => (state.activeCategory = payload),
  SET_MODAL_CATEGORY: (state, payload) => (state.modalCategory = payload),
  // brands
  SET_BRANDS: (state, payload) => (state.brands = payload),
  SET_ACTIVE_BRAND: (state, payload) => (state.activeBrand = payload),
  SET_MODAL_BRAND: (state, payload) => (state.modalBrand = payload),
  // models
  SET_MODELS: (state, payload) => (state.models = payload),
  SET_ACTIVE_MODEL: (state, payload) => (state.activeModel = payload),
  SET_MODAL_MODEL: (state, payload) => (state.modalModel = payload)
}
