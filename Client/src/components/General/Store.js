import { makeObservable, observable, action, computed } from "mobx";
import axios from "axios";
const productsURL = "http://localhost:8000/products";
const purchasesURL = "http://localhost:8000/purchases";
class Store {
  products = [];
  purchasedProductsAmount = 0;

  constructor() {
    makeObservable(this, {
      products: observable,
      purchasedProductsAmount: observable,
      loadProducts: action,
      loadPurchasesAmount: action,
      updateProduct: action,
      deleteProduct: action,
      increasePurchasedProductsAmount: action,
      addProductToCustomer: action,
      allProducts: computed,
      purchasedProductsCount: computed,
    });
  }

  loadProducts(productsList) {
    this.products = [...productsList];
  }
  deleteProduct(prodId) {
    const index = this.products.findIndex((p) => p.id === prodId);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  updateProduct(prod) {
    const index = this.products.findIndex((p) => p.id === prod.id);
    if (index > -1) {
      this.products[index] = prod;
    }
  }
  addProductToCustomer(productName, customer) {
    const index = this.products.findIndex((p) => p.name === productName);
    if (index > -1) {
      const product = this.products[index];
      this.products[index].quantity = product.quantity - 1;

      //1.update product in db
      (async () => {
        const resp = await axios.put(
          `${productsURL}/${product.id}`,
          this.products[index]
        );
      })();

      //2. update purchases
      (async () => {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const newPurchase = {
          customer_id: customer.customer_id,
          product_id: product.id,
          date: date,
        };
        const resp = await axios.post(purchasesURL, newPurchase);
      })();
    }
  }
  loadPurchasesAmount(amount) {
    this.purchasedProductsAmount = amount;
  }
  increasePurchasedProductsAmount() {
    this.purchasedProductsAmount++;
  }

  get allProducts() {
    return this.products;
  }
  get purchasedProductsCount() {
    return this.products;
  }
}
export default Store;
