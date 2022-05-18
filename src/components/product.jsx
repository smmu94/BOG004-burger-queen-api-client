import './css/product.scss';
// import burger from 'http://localhost:3000/image-data/burger.png';

const Product = (props) => {
  const onClick = () => {
    props.handleAddProduct({name: props.name, price: props.price, id: props.id});
  }

  return (
    <div className='product' onClick={onClick}>
      <img src={props.image} alt={props.name} />
      <p>{props.name}</p>
      <p>${props.price}</p>
    </div>
  );
};

export default Product;
