export const state = () => ({
  // ANCHOR : Clients states
  clients: [],
  activeClient: null,
  modalClient: false,
  // ANCHOR : Products states
  products: [],
  activeProduct: null,
  modalProduct: false,
  // ANCHOR : Settings states
  // units
  units: [],
  activeUnit: null,
  modalUnit: false,
  // parameters
  parameters: [],
  activeParameter: null,
  modalParameter: false,
  // document types
  documentTypes: [],
  activeDocumentType: null,
  modalDocumentType: false,
  // client types
  clientTypes: [],
  activeClientType: null,
  modalClientType: false,
  // genders
  genders: [],
  activeGender: null,
  modalGender: false,
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
  // ANCHOR : Clients actions
  async getClients({ commit }) {
    const { data } = await this.$axios.get('clients')
    commit('SET_CLIENTS', data)
  },
  activateClient({ commit }, clientId) {
    commit('SET_ACTIVE_CLIENT', clientId)
  },
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
  // parameters
  async getParameters({ commit }) {
    const { data } = await this.$axios.get('parameters')
    commit('SET_PARAMETERS', data)
  },
  activateParameter({ commit }, unitId) {
    commit('SET_ACTIVE_PARAMETER', unitId)
  },
  // document types
  async getDocumentTypes({ commit }) {
    const { data } = await this.$axios.get('document-types')
    commit('SET_DOCUMENT_TYPES', data)
  },
  activateDocumentType({ commit }, documentTypeId) {
    commit('SET_ACTIVE_DOCUMENT_TYPE', documentTypeId)
  },
  // client types
  async getClientTypes({ commit }) {
    const { data } = await this.$axios.get('client-types')
    commit('SET_CLIENT_TYPES', data)
  },
  activateClientType({ commit }, clientTypeId) {
    commit('SET_ACTIVE_CLIENT_TYPE', clientTypeId)
  },
  // genders
  async getGenders({ commit }) {
    const { data } = await this.$axios.get('genders')
    commit('SET_GENDERS', data)
  },
  activateGender({ commit }, genderId) {
    commit('SET_ACTIVE_GENDER', genderId)
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

export const getters = {
  documentTypes: (state) => {
    return state.documentTypes
      .filter((documentType) => documentType.isEnabled)
      .map((documentType) => ({
        id: documentType.id,
        label: `[${documentType.alias}] ${documentType.name}`
      }))
  },
  clientTypes: (state) => {
    return state.clientTypes
      .filter((clientType) => clientType.isEnabled)
      .map((clientType) => ({
        id: clientType.id,
        label: clientType.name
      }))
  },
  genders: (state) => {
    return state.genders
      .filter((gender) => gender.isEnabled)
      .map((gender) => ({
        id: gender.id,
        label: gender.name
      }))
  }
}

export const mutations = {
  // ANCHOR : Clients mutations
  SET_CLIENTS: (state, payload) => (state.clients = payload),
  SET_ACTIVE_CLIENT: (state, payload) => (state.activeClient = payload),
  SET_MODAL_CLIENT: (state, payload) => (state.modalClient = payload),
  // ANCHOR : Products mutations
  SET_PRODUCTS: (state, payload) => (state.products = payload),
  SET_ACTIVE_PRODUCT: (state, payload) => (state.activeProduct = payload),
  SET_MODAL_PRODUCT: (state, payload) => (state.modalProduct = payload),
  // ANCHOR : Settings mutations
  // units
  SET_UNITS: (state, payload) => (state.units = payload),
  SET_ACTIVE_UNIT: (state, payload) => (state.activeUnit = payload),
  SET_MODAL_UNIT: (state, payload) => (state.modalUnit = payload),
  // parameters
  SET_PARAMETERS: (state, payload) => (state.parameters = payload),
  SET_ACTIVE_PARAMETER: (state, payload) => (state.activeParameter = payload),
  SET_MODAL_PARAMETER: (state, payload) => (state.modalParameter = payload),
  // document types
  SET_DOCUMENT_TYPES: (state, payload) => (state.documentTypes = payload),
  SET_ACTIVE_DOCUMENT_TYPE: (state, payload) =>
    (state.activeDocumentType = payload),
  SET_MODAL_DOCUMENT_TYPE: (state, payload) =>
    (state.modalDocumentType = payload),
  // client types
  SET_CLIENT_TYPES: (state, payload) => (state.clientTypes = payload),
  SET_ACTIVE_CLIENT_TYPE: (state, payload) =>
    (state.activeClientType = payload),
  SET_MODAL_CLIENT_TYPE: (state, payload) => (state.modalClientType = payload),
  // genders
  SET_GENDERS: (state, payload) => (state.genders = payload),
  SET_ACTIVE_GENDER: (state, payload) => (state.activeGender = payload),
  SET_MODAL_GENDER: (state, payload) => (state.modalGender = payload),
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
