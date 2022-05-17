import './css/product.scss';
import burger from '../images/burger.png';

const Product = ({data:{name, price}}) => {
  return (
    <div className="product">
      <img src={burger} alt={name} />
      <h3>{name}</h3>
      <h3>{price}</h3>
    </div>
  );
};

export default Product;
