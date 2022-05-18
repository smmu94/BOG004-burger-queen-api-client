import './css/productSummary.scss';
import { AiOutlineMinusCircle } from 'react-icons/ai';

const Productsummary = ({productList}) => { 
  
  return (
     productList?.map(product => (
      <div className='product-summary' key={"sum"+product.id}>
      <div>{product.id}</div>
      <p>{product.name}</p>
      <p>${product.price}</p>
      <AiOutlineMinusCircle />
    </div>
    ))
  );
};

export  default Productsummary;
