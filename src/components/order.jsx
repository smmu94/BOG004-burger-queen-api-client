import './css/order.scss';
import { useEffect, useState } from 'react';
import {
  products,

} from './providers/OrderProducts';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from './product';

export default function Order({handleAddProduct}) { //handleAddProduct es una funcion que se le pasa como prop desde el container
  const [productos, setProductos] = useState([]); //array de objetos

  useEffect(() => { // useEffect es una función que se ejecuta cuando el componente se monta

    products() // llamamos a la función products() que está en el provider
      .then((response) => { // cuando la función products() se ejecuta, se ejecuta la función then()
        console.log(response.data);
        setProductos(response.data); // guardamos los datos en el estado
      })
      .catch(() => {});
  }, []);

  return (
    <div className='order'>
      <h2>MENÚ</h2>
      <Nav className='type-order'>
        <Link to=''>DESAYUNOS</Link>
        <Link to=''>ALMUERZOS</Link>
      </Nav>

      {productos.map((producto) => (
        <Product key={"ord" + producto.id} id={producto.id} handleAddProduct={handleAddProduct} name={producto.name} price={producto.price} image={producto.image}  />
      ))}
    </div>
  );
}
