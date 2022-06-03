import '@testing-library/jest-dom';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getAllByRole,
} from '@testing-library/react';

import Order from './order';
import Product from './product';

// import axios from 'axios';

jest.mock('../../providers/OrderProducts.js');

describe('Order test', () => {
  test('handles server error', async () => {
    render(<Order />);
    render(<Product />);
    await waitFor(() => {
      expect(screen.getByTestId('product')).toBeInTheDocument();
    });
  });
});
// falta saber como hacer que el test reconozca al array de productos para expect que cuantos 
