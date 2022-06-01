import { useState } from 'react';
import Productsummary from './productSummary';
import './css/orderSummary.scss';
// import { useNavigate,  } from "react-router-dom";
import { createOrder } from './providers/OrderProducts.js';
import { Alert } from 'reactstrap';
import {getId} from './providers/UserProvider.js';

const Ordersummary = ({ productList, handleRemoveProduct, reset }) => {
  const totalPrice = productList.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const [values, setValues] = useState({
    client: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let dateNow = new Date();
    const oder = {
      userId: getId(),
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
   localStorage.setItem('order', JSON.stringify(oder));

    createOrder(oder)
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {});

    setValues({
      client: '',
    });

    reset();
    setMessage('Pedido enviado');

    setTimeout(() => {
      setMessage(null);
    }, 1500);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    console.log(value);
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  };

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
          />
        </div>
        <Productsummary
          productList={productList}
          handleRemoveProduct={handleRemoveProduct}
        />
        <div className='final-summary'>
          <div>TOTAL: {totalPrice}</div>

          <button type='submit' className='btn-client'>
            ENVIAR
          </button>
        </div>
      </form>
      {message && <Alert color='success'>{message}</Alert>}
    </section>
  );
};

export default Ordersummary;
