import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AdminFormProducts from '../admin/adminFormProducts';

jest.mock('../../providers/OrderProducts.js');

window.BroadcastChannel = function () {
  this.name = '';
  this.close = jest.fn();
  this.postMessage = jest.fn();
};

const products = [
  {
    id: 1,
    name: 'Sandwich de jamón y queso',
    price: '15000',
    image: 'http://localhost:3000/image-data/Sandwich.png',
    type: 'Desayuno',
    dateEntry: '2022-03-05 15:14:10',
  },
];

describe('AdminFormProducts test', () => {
  test('deberia agregar un producto', async () => {
    render(<AdminFormProducts editProducts={products} />);

    const productName = screen.getByTestId('name-product');
    fireEvent.change(productName, {
      target: { value: 'Sandwich de jamón y queso' },
    });
    const productPrice = screen.getByTestId('price-product');
    fireEvent.change(productPrice, { target: { value: '15000' } });
    const productImage = screen.getByTestId('image-product');
    fireEvent.change(productImage, {
      target: { value: 'http://localhost:3000/image-data/Sandwich.png' },
    });
    const typeProduct = screen.getByTestId('type-product');
    fireEvent.change(typeProduct, { target: { value: 'Desayuno' } });
    const button = screen.getByText('AGREGAR PRODUCTO');
    fireEvent.click(button);

    await waitFor(
      () => {
        const message = screen.queryByTestId('created-product');

        expect(message.textContent).toBe('Producto creado correctamente');
      },
      { timeout: 3000 }
    );
  });

  test('debería actualizar los datos del producto', () => {
    const edit = jest.fn();
    const onClick = () => {
      edit(true);
    };
    const onClickUpdate = jest.fn();
    // const edit = jest.fn();
    render(<AdminFormProducts editProducts={onClickUpdate} edit={onClick} />);
    const updateButton = screen.getByTestId('update-product');
    fireEvent.click(updateButton);

    expect(onClickUpdate).toHaveBeenCalled();
  });

  
});
