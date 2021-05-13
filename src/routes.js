import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import ProductDetails from "./components/ProductDetails.vue";
import AddToCart from "./components/AddToCart.vue";
import AddProduct from "./components/admin/AddProduct.vue";
const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "ProductDetails",
    path: "/productdetails/:id",
    component: ProductDetails,
  },
  {
    name: "AddToCart",
    path: "/addtocart",
    component: AddToCart,
  },
  {
    name: "AddProduct",
    path: "/admin/addproduct",
    component: AddProduct,
  },
];

const router = createRouter({ history: createWebHistory(), routes: routes });

export default router;
