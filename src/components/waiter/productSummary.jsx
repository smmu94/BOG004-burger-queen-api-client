import "../css/productSummary.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";

const Productsummary = ({ productList, handleRemoveProduct}) => {
 
  

  return productList?.map((product) => (
    <div data-testid='quantity-product' key={"sum" + product.id}>
    <section className="product-summary" >
      <div className='quantity' >
        {product.quantity}
        </div>
      <div className='name'>{product.name}</div>
      <section className='price-minus'>
        <div className='price'>
        ${product.price}
        </div>
        <AiOutlineMinusCircle data-testid='subtract' className='subtract' onClick={() => handleRemoveProduct(product.id)}/>
        </section>
    </section>
    </div>
  ));
};

export default Productsummary;
