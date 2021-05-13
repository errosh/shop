<template>
  <div
    class="card m-2 shadow"
    style="width: 20rem; display: inline-flex; align-items: center; height: 20%"
  >
    <img
      class="card-img-top"
      style="width: 100px; height: 150px"
      :src="data.image"
      alt="Product Image"
    />
    <!-- <div class="card-body">
      <h5 class="card-title">{{ data.title }}</h5>
      <p class="card-text">
        {{ data.description }}
      </p>
    </div> -->
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Category : {{ data.category }}</li>
      <li class="list-group-item">Price : {{ data.price }}</li>
    </ul>
    <div class="card-body">
      <a class="card-link btn btn-secondary" @click="viewMore(data.id)"
        >View More</a
      >
      <a @click="AddToCart(data)" class="card-link btn btn-warning"
        >Add To Cart</a
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Product",

  props: {
    data: Object,
    AddToCart: Function,
  },
  methods: {
    viewMore(productId) {
      this.$router.push({
        name: "ProductDetails",
        params: { id: productId },
      });
    },
  },
};
</script>
