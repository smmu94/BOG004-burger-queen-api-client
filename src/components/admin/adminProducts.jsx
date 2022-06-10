import "../css/adminProducts.scss";

const AdminProduct = ({ image, name, price }) => {
  
  return (
    <div className="admin-product">
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>${price}</p>
    </div>
  );
};

export default AdminProduct;