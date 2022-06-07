import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Kitchen from '../kitchen/kitchen'; 


jest.mock('../../providers/OrderProducts.js');
window.BroadcastChannel = function (){ 
  this.close= jest.fn(); 
  this.postMessage= jest.fn()
}

const dataEntry = '2022-6-6 11:1'

const product = [
    {
      id: 2,
      name: 'Café americano',
      price: 500,
      quantity: 1,
      type: 'Desayuno',

    },
  ];
  const id = 5;
  

describe('Kitchen test', () => {
 test('deberia mostrar un mensaje con el tiempo de preparación del pedido', async () => {
    render(<Kitchen id={id} product={[product]} dataEntry={dataEntry}  />);
    
    const button = screen.getByText('ENVIAR');
    fireEvent.click(button);
    
    await (waitFor(() => {
      const message = screen.queryByTestId('delivered-order');
    
      expect(message.textContent).toBe('La preparación del pedido tomó 04:27:00 horas');
    }));
 });
});

 