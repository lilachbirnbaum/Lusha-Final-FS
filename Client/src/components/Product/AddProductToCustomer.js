import ComboBox from "../General/ComboBox";
const AddProductToCustomer = ({
  store,
  selectedCustomer,
  saveButtonHandler,
  setSelectedProduct,
}) => {
  return (
    <div className="add-product-to-customer-box">
      <h3>{`Add product to ${selectedCustomer.first_name} ${selectedCustomer.last_name} `}</h3>
      <div className="flex">
        <ComboBox
          list={store.allProducts.filter((p) => p.quantity > 0)}
          onSelected={setSelectedProduct}
        />
        <button id="save-button" onClick={() => saveButtonHandler()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddProductToCustomer;
