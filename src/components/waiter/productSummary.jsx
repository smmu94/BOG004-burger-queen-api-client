import "../css/productSummary.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";
import Table from "react-bootstrap/Table";

const Productsummary = ({ productList, handleRemoveProduct }) => {
  const isEmpty = productList.length === 0;

  const productsToRender = isEmpty
    ? [{ id: "placeholder", quantity: 0, name: "-", price: 0 }]
    : productList;

  return (
    <div className="product-summary-wrapper">
      <Table striped bordered hover className="summary-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody data-testid="quantity-product">
          {productsToRender.map((product) => (
            <tr className="product-summary" key={"sum" + product.id}>
              <td>
                <div className="quantity">{product.quantity}</div>
              </td>
              <td className="name">{product.name}</td>
              <td>${product.price}</td>
              <td>
                <AiOutlineMinusCircle
                  data-testid="subtract"
                  className={`subtract ${isEmpty ? "disabled" : ""}`}
                  onClick={
                    isEmpty ? undefined : () => handleRemoveProduct(product.id)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Productsummary;
