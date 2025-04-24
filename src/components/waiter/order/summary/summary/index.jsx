import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import Table from "react-bootstrap/Table";
import { AiOutlineMinusCircle } from "react-icons/ai";
import "./productSummary.scss";
import { placeholderProduct } from "./constants";

const ProductSummary = () => {
  const { products, removeProduct } = useCurrentOrderStore();
  const isEmpty = products.length === 0;

  const displayedProducts = isEmpty ? [placeholderProduct] : products;
  const handleRemove = (id) => {
    if (!isEmpty) removeProduct(id);
  };

  return (
    <div className="product-summary-wrapper" data-testid="product-summary">
      <Table striped bordered hover responsive className="summary-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody data-testid="quantity-product">
          {displayedProducts.map(({ id, quantity, name, price }) => (
            <tr className="product-summary" key={"sum" + id}>
              <td>
                <div className="quantity">{quantity}</div>
              </td>
              <td className="name">{name}</td>
              <td>${price}</td>
              <td>
                <AiOutlineMinusCircle
                  data-testid="subtract"
                  className={`subtract ${isEmpty ? "disabled" : ""}`}
                  onClick={() => handleRemove(id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductSummary;
