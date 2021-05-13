<template>
  <h2>Product List</h2>
  <div class="container">
    <div>
      <div
        v-if="loader"
        class="spinner-border text-info mt-10"
        role="status"
      ></div>
      <Product
        v-else
        :data="product"
        v-for="product in products"
        :key="product.id"
        :AddToCart="AddToCart"
      />
    </div>
  </div>
</template>
<script>
import Product from "./Product.vue";
export default {
  name: "Home",
  components: {
    Product,
  },
  data: () => ({
    products: [],
    loader: true,
    addtocart: [],
  }),
  mounted() {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((json) => {
        this.products = json;
        this.loader = false;
      });
  },
  methods: {
    AddToCart(product) {
      if (localStorage.getItem("cartdata") !== null) {
        this.addtocart = JSON.parse(localStorage.getItem("cartdata"));
      }

      let check = this.addtocart.find((obj) => {
        return obj.id === product.id;
      });
      if (check !== undefined) {
        check.qty = check.qty !== undefined ? check.qty + 1 : 1;
      } else {
        product.qty = 1;
        this.addtocart.push(product);
      }

      localStorage.setItem("cartdata", JSON.stringify(this.addtocart));
      this.$router.push("AddToCart");
    },
  },
};
</script>
