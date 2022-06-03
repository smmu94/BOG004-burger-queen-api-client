import '@testing-library/jest-dom';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getAllByRole,
} from '@testing-library/react';
import Product from './product';

describe('Product', () => {
  test('it renders the product', () => {
    render(<Product />);
    expect(screen.getByTestId('product')).toBeInTheDocument();
  });

  test('it renders the product name', () => {
    render(<Product />);
    const button = screen.getByTestId('product');
  fireEvent.click(button);
    expect(screen.getByTestId('onClick')).toBeInTheDocument();
  });
});