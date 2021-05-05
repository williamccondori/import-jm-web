export const state = () => ({
  // ANCHOR : Settings states
  units: [],
  modalUnit: false,
  categories: [],
  modalCategory: false,
  brands: [],
  modalBrand: false,
  models: [],
  modalModel: false
})

export const actions = {
  // ANCHOR : Settings actions
  getUnits({ commit }) {
    const data = []
    commit('SET_UNITS', data)
  },
  getCategories({ commit }) {
    const data = []
    commit('SET_CATEGORIES', data)
  },
  getBrands({ commit }) {
    const data = []
    commit('SET_BRANDS', data)
  },
  getModels({ commit }) {
    const data = []
    commit('SET_MODELS', data)
  }
}

export const mutations = {
  // ANCHOR : Settings mutrarions
  SET_UNITS: (state, payload) => (state.units = payload),
  SET_MODAL_UNIT: (state, payload) => (state.modalUnit = payload),
  SET_CATEGORIES: (state, payload) => (state.categories = payload),
  SET_MODAL_CATEGORY: (state, payload) => (state.modalCategory = payload),
  SET_BRANDS: (state, payload) => (state.brands = payload),
  SET_MODAL_BRAND: (state, payload) => (state.modalBrand = payload),
  SET_MODELS: (state, payload) => (state.models = payload),
  SET_MODAL_MODEL: (state, payload) => (state.modalModel = payload)
}
