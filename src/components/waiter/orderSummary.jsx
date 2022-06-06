import { useState } from 'react';
import Productsummary from './productSummary';
import '../css/orderSummary.scss';
import { createOrder } from '../../providers/OrderProducts.js';
import { Alert } from 'reactstrap';


const Ordersummary = ({ productList, handleRemoveProduct, reset }) => {
 
  // console.log(productList)

  const [values, setValues] = useState({
    client: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let dateNow = new Date();
    const oder = {
      // userId: getId(),
      client: values.client,
      products: productList,
      status: 'pending',
      dataEntry:
        dateNow.getFullYear() +
        '-' +
        (dateNow.getMonth() + 1 )+
        '-' +
       dateNow.getDate() +
        ' ' +
        dateNow.getHours() +
        ':' +
        dateNow.getMinutes(),
    };
  //  localStorage.setItem('order', JSON.stringify(oder));

    createOrder(oder)
      .then((response) => {
        // console.log(response.data);
        setMessage('Orden creada con éxito');
      })
      .catch(() => {});

    setValues({
      client: '',
    });

    reset();

  
    setTimeout(() => {
      setMessage(null);
    }, 1500);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    // console.log(value);
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  };

  const totalPrice = productList.reduce(
    
    (total, product) => total + product.price * product.quantity,
    0
  );
  return (
    <section className='contain-form-client'>
      <form id='form' className='form-client' onSubmit={handleSubmit}>
        <div>
          <p className='nameClient'>CLIENTE</p>
          <input
            type='text'
            name='client'
            className='client'
            value={values.client}
            required
            onChange={handleChange}
            data-testid='input-client'
          />
        </div>
        <Productsummary
          productList={productList}
          handleRemoveProduct={handleRemoveProduct}
        />
        <div className='final-summary'>
          <div>TOTAL: {totalPrice}</div>
          {message && <Alert color='success' data-testid='created-order'>{message}</Alert>}
          <button type='submit' data-testid='btn-client' className='btn-client'>
            ENVIAR
          </button>
        </div>
      </form>
   
    </section>
  );
};

export default Ordersummary;
