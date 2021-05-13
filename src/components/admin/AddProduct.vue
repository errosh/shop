<template>
  <div class="table-responsive container">
    <h2 class="text-start">
      Add Product
      <font-awesome-icon
        icon="plus-square"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      />
    </h2>

    <table class="table table-success table-striped">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <div
          v-if="loader"
          class="spinner-border text-info mt-10"
          role="status"
        ></div>
        <tr v-else v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>{{ product.category }}</td>
          <td><img :src="product.image" style="width: 50px; height: 35" /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal" tabindex="-1" id="exampleModal">
    <form>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item.name"
                  placeholder="Enter product name.."
                  autocomplete="off"
                />
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Product Category</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="item.category"
                  placeholder="Enter product category.."
                  autocomplete="off"
                />
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  v-model="item.description"
                  placeholder="Enter product description."
                />
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Product Price</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="item.price"
                  placeholder="Enter product price.."
                />
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Choose File</label>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="onChange"
                />
              </div>
              <div class="mb-3">
                <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  style="width: 200px; height: 150px"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="handleSubmit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  components: {},
  data() {
    return {
      item: {
        name: null,
        image: null,
        imageUrl: null,
        price: 0,
        description: null,
        category: null,
      },
      loader: true,
      products: [],
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    handleSubmit() {
      let data = new FormData();
      data.append("title", this.item.name);
      data.append("image", this.item.image);
      data.append("price", this.item.price);
      data.append("description", this.item.description);
      data.append("category", this.item.category);

      fetch("http://localhost:8000/addproduct", {
        method: "POST",
        body: data,
      })
        .then(() => {
          this.getProduct();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onChange(e) {
      const file = e.target.files[0];
      this.item.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
    },
    getProduct() {
      fetch("http://localhost:8000/products")
        .then((res) => res.json())
        .then((json) => {
          this.products = json;
          this.loader = false;
        });
    },
  },
};
</script>
