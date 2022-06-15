import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import AdminWorkers from "../admin/adminWorkers";

window.BroadcastChannel = function (){ 
  this.name= ""; 
  this.close= jest.fn(); 
  this.postMessage= jest.fn()
}

describe("adminWorkers", () => {
    test("it renders the AdminWorkers", () => {
      render(<AdminWorkers />);
      expect(screen.getByTestId("admin-worker")).toBeInTheDocument();
    });
 
    test("Testing edit of AdminWorkers component", () => {
      // const onClick = jest.fn();
      render(<AdminWorkers  />);
      const editIcon = screen.getByTestId("edit-worker");
      fireEvent.click(editIcon);
      expect(screen.getByTestId('admin-form-workers')).toBeInTheDocument();

    });
    test("Testing delete of AdminWorkers component", () => {
      const onClick = jest.fn();
      render(<AdminWorkers  deleteUsers={onClick} />);
      const deleteIcon = screen.getByTestId("delete-worker");
      fireEvent.click(deleteIcon);
      
      expect(onClick).toHaveBeenCalled()
    });
  });