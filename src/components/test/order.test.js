import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import Order from "../waiter/order";

// import axios from 'axios';

 jest.mock('../../providers/OrderProducts.js');


describe("Order test", () => {
  beforeEach(() => {
    
  });

  test("muestra los productos", async () => {
    render(<Order />);
    await waitFor(() => {
      const cards = screen.getAllByTestId("card-product");
      expect(cards.length).toBe(2);
    });
  });
});
