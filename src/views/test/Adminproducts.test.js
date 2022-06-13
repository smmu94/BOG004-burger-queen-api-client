import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Adminproducts from '../Adminproducts';
import { Router } from "react-router-dom";

jest.mock('../../providers/OrderProducts.js');

window.BroadcastChannel = function () {
  this.name = '';
  this.close = jest.fn();
  this.postMessage = jest.fn();
};

describe('Adminproducts', () => {
  test('muestra los productos (view)', async () => {
    render(
        <Router >
          <Adminproducts />
        </Router>
      );
    await waitFor(() => {
      const cards = screen.getAllByTestId('products-product');
      expect(cards.length).toBe(2);
    });
  });
});
