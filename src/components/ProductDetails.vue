<template>
  <h2>Product Detail</h2>
  <div v-if="loader" class="spinner-border text-info mt-10" role="status"></div>
  <div v-else class="card m-2" style="align-items: center">
    <img
      class="card-img-top"
      style="width: 100px; height: 150px"
      :src="data.image"
      alt="Product Image"
    />
    <div class="card-body">
      <h5 class="card-title">{{ data.title }}</h5>
      <p class="card-text">
        {{ data.description }}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Category : {{ data.category }}</li>
      <li class="list-group-item">Price : {{ data.price }}</li>
    </ul>
    <div class="card-body">
      <a href="#" @click="$router.go(-1)" class="card-link btn btn-secondary"
        >Back</a
      >
      <a href="#" @click="AddToCart(data)" class="card-link btn btn-warning"
        >Add To Cart</a
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductDetail",

  data: () => ({
    data: [],
    loader: true,
    addtocart: [],
  }),
  beforeMount() {
    fetch("http://localhost:8000/products/" + this.$route.params.id)
      .then((res) => res.json())
      .then((json) => {
        this.data = json[0];
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
      this.$router.push("/AddToCart");
    },
  },
};
</script>
