import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import "./product.scss";

const Product = ({ name, price, id, type, image }) => {
  const { addProduct } = useCurrentOrderStore();
  const handleClick = () => {
    addProduct({ name, price, id, type });
  };

  return (
    <div className="product" data-testid="card-product" onClick={handleClick}>
      <div className="img">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default Product;
