<template>
  <h2>Cart List</h2>
  <div class="table-responsive col-12 mx-auto">
    <table class="table table-bordered border-primary active table-condensed">
      <tr>
        <th>Product</th>
        <th>Name</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total Price</th>
        <th>Remove</th>
      </tr>
      <tr v-for="product in cartdata" :key="product.id">
        <td>
          <img :src="product.image" style="width: 100px; height: 100px" />
        </td>
        <td>
          {{ product.title }} <br />
          <small style="color: blue">{{ product.category }}</small>
        </td>

        <td>
          {{ product.qty }}
          <button
            style="border: 1px solid green; margin-right: 1px"
            @click="AddToCart(product, 'add')"
            type="button"
          >
            +</button
          ><button
            style="border: 1px solid red"
            @click="AddToCart(product, 'less')"
            type="button"
          >
            -
          </button>
        </td>
        <td>{{ product.price }}</td>
        <td>{{ product.qty * product.price }}</td>
        <td>
          <button
            style="border: 1px solid red"
            @click="RemoveToCart(product)"
            type="button"
          >
            Remove
          </button>
        </td>
      </tr>

      <tr>
        <td></td>
        <td></td>

        <td>{{ totalQty }}</td>
        <td></td>
        <td>{{ totalPrice.toFixed(2) }}</td>
        <td></td>
      </tr>
    </table>
    <button @click="$router.go(-1)" class="btn btn-secondary mx-2">Back</button>
    <button @click="placeOrder" class="btn btn-success">Place Order</button>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
  data: () => ({
    cartdata: [],
    addtocart: [],
    totalQty: 0,
    totalPrice: 0,
  }),
  mounted() {
    this.cartdata = JSON.parse(localStorage.getItem("cartdata"));
    this.getTotal();
  },
  methods: {
    getTotal() {
      this.totalQty = JSON.parse(localStorage.getItem("cartdata")).reduce(
        (total, curVal) => {
          return total + curVal.qty;
        },
        0
      );
      this.totalPrice = JSON.parse(localStorage.getItem("cartdata")).reduce(
        (total, curVal) => {
          return total + curVal.qty * curVal.price;
        },
        0
      );
    },
    AddToCart(product, opr) {
      if (localStorage.getItem("cartdata") !== null) {
        this.addtocart = JSON.parse(localStorage.getItem("cartdata"));
      }

      let check = this.addtocart.find((obj) => {
        return obj.id === product.id;
      });
      if (check !== undefined) {
        check.qty =
          check.qty !== undefined
            ? opr == "add"
              ? check.qty + 1
              : check.qty > 0
              ? check.qty - 1
              : 0
            : 1;
      } else {
        product.qty = 1;
        this.addtocart.push(product);
      }

      localStorage.setItem("cartdata", JSON.stringify(this.addtocart));
      this.getTotal();
      this.cartdata = this.addtocart;
    },
    RemoveToCart(product) {
      let index = this.cartdata.indexOf(product);
      this.cartdata.splice(index, 1);
      localStorage.setItem("cartdata", JSON.stringify(this.cartdata));
      this.getTotal();
    },
  },
};
</script>

<style></style>
