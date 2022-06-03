import "../css/productSummary.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";

const Productsummary = ({ productList, handleRemoveProduct}) => {
 
  

  return productList?.map((product) => (
    <section className="product-summary" key={"sum" + product.id}>
      <div className='quantity'>
        {product.quantity}
        </div>
      <div className='name'>{product.name}</div>
      <section className='price-minus'>
        <div className='price'>
        ${product.price}
        </div>
        <AiOutlineMinusCircle className='subtract' onClick={() => handleRemoveProduct(product.id)}/>
        </section>
       
      
    </section>
  ));
};

export default Productsummary;
