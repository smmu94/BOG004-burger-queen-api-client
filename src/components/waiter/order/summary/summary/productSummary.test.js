import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Productsummary from '.';




// jest.mock('../../views/Order.jsx');


const product = {
  name: 'Sandwich de jamón y queso',
  price: 1000,
  id: 1,
  type: 'Desayuno',
  quantity: 2,
};


describe('productSummary test', () => {
 
  test('La cantidad de productos agregados deberia disminuir', async () => {
    const  onHandleRemoveProduct = jest.fn();
    render(
      <Productsummary
        productList={[product]}
        handleRemoveProduct={onHandleRemoveProduct}
      />
    );
    const button = screen.getByTestId('subtract');
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });
    expect(onHandleRemoveProduct).toHaveBeenCalled();  
  });
});
