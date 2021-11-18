import Product from "./Product";
const AllProductList = ({ store, cusWhoPurcClicked }) => {
  return (
    <div className="flex">
      <div className="products-list">
        <h3>All Products</h3>
        {store.allProducts.map((p, i) => (
          <Product
            product={p}
            key={`${i}product${p.id}`}
            callback={cusWhoPurcClicked}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductList;
