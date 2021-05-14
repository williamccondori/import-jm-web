<template>
  <div>
    <h2 class="sub-title">REGISTRAR ÓRDEN</h2>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="16">
        <el-form
          ref="formItem"
          size="mini"
          :model="item"
          :rules="rulesItem"
          label-width="auto"
          label-position="left"
          @submit.native.prevent="addItem"
        >
          <el-form-item prop="productId" label="Producto:">
            <el-select
              v-model="item.productId"
              :loading="loadingProducts"
              remote
              clearable
              filterable
              reserve-keyword
              placeholder="Ingrese el nombre del producto."
              :remote-method="searchProducts"
            >
              <el-option
                v-for="product in products"
                :key="product.id"
                :label="product.name"
                :value="product.id"
              />
            </el-select>
          </el-form-item>
          <el-row :gutter="25">
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
              <el-form-item prop="cuantity" label="Cantidad:">
                <el-input-number v-model="item.cuantity" :min="1" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16">
              <el-form-item prop="cost" label="Costo:">
                <el-input
                  v-model="item.cost"
                  class="input-with-select"
                  @change="handleChangeCost"
                >
                  <el-select
                    slot="append"
                    v-model="item.currencyId"
                    placeholder="Seleccione"
                    @change="handleChangeCurrency"
                  >
                    <el-option
                      v-for="currency in currencies"
                      :key="currency.id"
                      :label="currency.label"
                      :value="currency.id"
                    />
                  </el-select>
                  <template v-if="symbol" slot="prepend">
                    <span>{{ symbol }}</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="25">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-form-item
                prop="providerPrice"
                label="Precio del distribuidor:"
              >
                <el-input
                  v-model="item.providerPrice"
                  type="number"
                  disabled
                  readonly
                >
                  <template v-if="symbol" slot="prepend">
                    <span>S/</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-form-item prop="freight" label="Flete:">
                <el-input v-model="item.freight" type="number" step="0.01">
                  <template v-if="symbol" slot="prepend">
                    <span>S/</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="25">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-form-item prop="wholesalePrice" label="Precio por mayor:">
                <el-input
                  v-model="item.wholesalePrice"
                  step="0.01"
                  type="number"
                >
                  <template v-if="symbol" slot="prepend">
                    <span>S/</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-form-item prop="retailPrice" label="Precio por menor:">
                <el-input v-model="item.retailPrice" type="number" step="0.01">
                  <template v-if="symbol" slot="prepend">
                    <span>S/</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-right">
            <el-button type="primary" size="small" native-type="submit" plain>
              Agregar producto
            </el-button>
          </div>
        </el-form>
        <el-divider />
        <el-card shadow="never">
          <el-table :data="items" size="mini">
            <el-table-column prop="name" label="Fecha" />
            <el-table-column prop="name" label="Nombre" />
            <el-table-column prop="cost" label="Costo" />
            <el-table-column label="Operaciones">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  round
                  @click="handleProductDelete(scope.row)"
                >
                  Eliminar
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card shadow="never">
          <el-form
            ref="form"
            size="small"
            :rules="rules"
            :model="model"
            @submit.native.prevent="save"
          >
            <el-form-item prop="description" label="Fecha:">
              <el-date-picker
                v-model="model.date"
                type="date"
                readonly
                disabled
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item prop="providerId" label="Proveedor:">
              <el-select v-model="model.providerId" placeholder="Seleccione">
                <el-option
                  v-for="provider in providers"
                  :key="provider.id"
                  :label="provider.label"
                  :value="provider.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="currencyChange" label="Tipo de cambio:">
              <el-input v-model="model.currencyChange">
                <template v-if="symbol" slot="prepend">
                  <span>$</span>
                </template>
              </el-input>
            </el-form-item>
            <el-button
              plain
              block
              type="success"
              style="width: 100%"
              native-type="submit"
              >Registrar órden</el-button
            >
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const item = {
  cuantity: 0,
  productId: null,
  currencyId: 'USD',
  cost: 0.0,
  providerPrice: 0.0,
  freight: 0.2, // flete
  wholesalePrice: 0.0,
  retailPrice: 0.0
}

const model = {
  providerId: null,
  currencyId: 'USD',
  currencyChange: 3.5,
  date: new Date()
}

export default {
  data() {
    const validator = (_, value, callback) => {
      if (value === 0) {
        callback(new Error('Este campo debe ser mayor a 0'))
      } else {
        callback()
      }
    }

    return {
      item: { ...item },
      model: { ...model },
      rulesItem: {
        productId: [{ required: true, message: 'Obligatorio' }],
        cuantity: [
          { required: true, message: 'Obligatorio' },
          { validator, message: 'Debe ser mayor a 0' }
        ],
        cost: [
          { required: true, message: 'Obligatorio' },
          { validator, message: 'Debe ser mayor a 0' }
        ],
        providerPrice: [
          { required: true, message: 'Obligatorio' },
          { validator, message: 'Debe ser mayor a 0' }
        ],
        freight: [
          { required: true, message: 'Obligatorio' },
          { validator, message: 'Debe ser mayor a 0' }
        ],
        wholesalePrice: [
          { required: true, message: 'Obligatorio' },
          { validator, message: 'Debe ser mayor a 0' }
        ],
        retailPrice: [
          { required: true, message: 'Obligatorio' },
          { validator, message: 'Debe ser mayor a 0' }
        ]
      },
      rules: {},
      items: [],
      // products
      products: [],
      loadingProducts: false,
      // currency
      symbol: '$'
    }
  },
  async fetch() {
    await this.getProviders()
  },
  computed: {
    ...mapGetters(['providers', 'currencies'])
  },
  methods: {
    ...mapActions(['getProviders']),
    handleChangeCurrency() {
      const { currencyId } = this.model
      if (currencyId) {
        const currency = this.currencies.filter(
          (currency) => currency.id === currencyId
        )[0]
        if (currency) {
          this.symbol = currency.symbol
          this.model.currencyChange = currency.id === 'PER' ? 0 : '3.5'
        }
      }
    },
    async searchProducts(query) {
      if (query) {
        try {
          this.loadingProducts = true
          const { data } = await this.$axios.get(
            `products/results?query=${query}`
          )
          this.products = data
        } catch ({ message }) {
          this.$notify({
            type: 'error',
            title: 'Error',
            message
          })
        } finally {
          this.loadingProducts = false
        }
      }
    },
    handleProductDelete(product) {
      // get element by productId and remove from item's list
      this.items = this.items.filter((x) => x.productId !== product.productId)
    },
    handleChangeCost() {
      const useDollar = this.model.currencyId === 'USD'
      const change = useDollar ? this.model.currencyChange : 1
      this.item.providerPrice = this.item.cost * change
    },
    addItem() {
      try {
        this.$refs.formItem.validate((valid) => {
          if (!valid) throw new Error('Datos inválidos')
        })
        // validate an existing product in the item's list
        const existingProduct = this.items.filter(
          (x) => x.productId === this.item.productId
        )[0]
        if (existingProduct) {
          throw new Error(
            'El producto ya ha sido agregado a la lista de artículos'
          )
        }
        // add product to item's list
        const product = this.products.filter(
          (x) => x.id === this.item.productId
        )[0]
        this.item.productName = product.name
        this.items.push(this.item)
      } catch ({ message }) {
        this.$notify({
          type: 'error',
          title: 'Error',
          message
        })
      }
    },
    save() {}
  }
}
</script>
