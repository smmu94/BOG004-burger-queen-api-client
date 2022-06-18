import '../css/product.scss';

const Product = (props) => {
  const onClick = () => {
    props.handleAddProduct({name: props.name, price: props.price, id: props.id, type: props.type});
  }

  return (
    <div className='product' data-testid='card-product' onClick={onClick}>
      <img src={props.image} alt={props.name} />
      <div className='product-info'>
      <p>{props.name}</p>
      <p>${props.price}</p>
      </div>
    </div>
  );
};

export default Product;
