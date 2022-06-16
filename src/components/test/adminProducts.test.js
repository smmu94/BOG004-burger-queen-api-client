import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import AdminProduct from "../admin/adminProducts";

window.BroadcastChannel = function (){ 
  this.name= ""; 
  this.close= jest.fn(); 
  this.postMessage= jest.fn()
}

describe("adminProducts", () => {
    test("it renders the Adminproduct", () => {
      render(<AdminProduct />);
      expect(screen.getByTestId("admin-product")).toBeInTheDocument();
    });
  
    test("img should be in the document", () => {
      render(<AdminProduct />);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  
    test("Testing product component", () => {
      // const onClick = jest.fn();
      render(<AdminProduct  />);
      const editIcon = screen.getByTestId("edit-product");
      fireEvent.click(editIcon);
      
      expect(screen.getByTestId('product-edit')).toBeInTheDocument();
    });
    test("Testing product delete component", () => {
      const onClick = jest.fn();
      render(<AdminProduct  deleteProducts={onClick} />);
      const deleteIcon = screen.getByTestId("product-delete");
      fireEvent.click(deleteIcon);
      
      expect(onClick).toHaveBeenCalled()
    });
  });


