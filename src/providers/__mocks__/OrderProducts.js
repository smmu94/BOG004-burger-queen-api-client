const products = () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          id: 1,
          name: 'Sandwich de jamón y queso',
          price: 1000,
          image: 'http://localhost:3000/image-data/Sandwich.png',
          type: 'Desayuno',
          dateEntry: '2022-03-05 15:14:10',
        },
        {
          id: 2,
          name: 'Café americano',
          price: 500,
          image: 'http://localhost:3000/image-data/cafe.png',
          type: 'Desayuno',
          dateEntry: '2022-03-05 15:14:10',
        },
        {
          id: 3,
          name: 'Agua 500ml',
          price: 500,
          image: 'http://localhost:3000/image-data/agua.png',
          type: 'Almuerzo',
          dateEntry: '2022-03-05 15:14:10',
        },
      ],
    });
  });
};

const createOrder = () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          // "userId": 3,
          client: 'Pepe Gonzalez',
          products: [
            {
              name: 'Café americano',
              price: 500,
              id: 2,
              type: 'Desayuno',
              quantity: 1,
            },
          ],
          status: 'pending',
          dataEntry: '2022-6-6 11:1',
          id: 5,
        },
      ],
    });
  });
};

const updateOrder = () => {
  return new Promise((resolve) => {
    resolve({
      data: 
        {
          "userId": 3,
          "client": "Pepe Gonzalez",
          "products": [
            {
              "name": "Sandwich de jamón y queso",
              "price": 1000,
              "id": 1,
              "type": "Desayuno",
              "quantity": 2
            },
            {
              "name": "Café americano",
              "price": 500,
              "id": 2,
              "type": "Desayuno",
              "quantity": 2
            }
          ],
          "status": "delivered",
          "dataEntry": "2022-6-6 11:1",
          "id": 5,
          "dateProcessed": "2022-6-6 15:28",
          "timeOrd": "04:27:00"
        },
    });
  });
};

export { products, createOrder, updateOrder };
