import "./css/productSummary.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";

const Productsummary = ({ productList }) => {
  return productList?.map((product) => (
    <section className="product-summary" key={"sum" + product.id}>
      <p>{product.name}</p>
      <section>
      <div>{product.quantity}</div>
        <p>${product.price}</p>
        <AiOutlineMinusCircle />
      </section>
    
      
    </section>
  ));
};

export default Productsummary;
