import "../css/productSummary.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";
import Table from "react-bootstrap/Table";

const Productsummary = ({ productList, handleRemoveProduct }) => {
  return productList?.map((product) => (
    <Table striped bordered hover key={"sum" + product.id}>
      <tbody data-testid="quantity-product" >
        <tr className="product-summary">
          <td className="quantity">{product.quantity}</td>
          <td className="name">{product.name}</td>
          <td className="price">${product.price}</td>
          <td>
            <AiOutlineMinusCircle
              data-testid="subtract"
              className="subtract"
              onClick={() => handleRemoveProduct(product.id)}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  ));
};

export default Productsummary;
