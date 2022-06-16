const products = () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          id: 1,
          name: "Sandwich de jamón y queso",
          price: 1000,
          image: "http://localhost:3000/image-data/Sandwich.png",
          type: "Desayuno",
          dateEntry: "2022-03-05 15:14:10",
        },
        {
          id: 2,
          name: "Café americano",
          price: 500,
          image: "http://localhost:3000/image-data/cafe.png",
          type: "Desayuno",
          dateEntry: "2022-03-05 15:14:10",
        },
        {
          id: 3,
          name: "Agua 500ml",
          price: 500,
          image: "http://localhost:3000/image-data/agua.png",
          type: "Almuerzo",
          dateEntry: "2022-03-05 15:14:10",
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
          client: "Pepe Gonzalez",
          products: [
            {
              name: "Café americano",
              price: 500,
              id: 2,
              type: "Desayuno",
              quantity: 1,
            },
          ],
          status: "pending",
          dataEntry: "2022-6-6 11:1",
          id: 5,
        },
      ],
    });
  });
};

const createProduct = () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          id: 1,
          name: "Sandwich de jamón y queso",
          price: "15000",
          image: "http://localhost:3000/image-data/Sandwich.png",
          type: "Desayuno",
          dateEntry: "2022-03-05 15:14:10",
        },
      ],
    });
  });
};

const updateOrder = () => {
  return new Promise((resolve) => {
    resolve({
      data: {
        userId: 3,
        client: "Pepe Gonzalez",
        products: [
          {
            name: "Sandwich de jamón y queso",
            price: 1000,
            id: 1,
            type: "Desayuno",
            quantity: 2,
          },
          {
            name: "Café americano",
            price: 500,
            id: 2,
            type: "Desayuno",
            quantity: 2,
          },
        ],
        status: "delivered",
        dataEntry: "2022-6-6 11:1",
        id: 5,
        dateProcessed: "2022-6-6 15:28",
        timeOrd: "04:27:00",
      },
    });
  });
};

const getOrder = () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          client: "Juana Cruz",
          products: [
            {
              name: "Sandwich de jamón y queso",
              price: "10000",
              id: 1,
              type: "Desayuno",
              quantity: 1,
            },
            {
              name: "Agua 500ml",
              price: "2000",
              id: 3,
              type: "Almuerzo",
              quantity: 1,
            },
          ],
          status: "delivered",
          dataEntry: "2022-6-11 11:39",
          id: 7,
          dateProcessed: "2022-6-11 12:53",
          timeOrd: "01:14:00",
        },
        {
          client: "Juan Rodriguez",
          products: [
            {
              name: "Sandwich de jamón y queso",
              price: "10000",
              id: 1,
              type: "Desayuno",
              quantity: 1,
            },
            {
              name: "Café americano",
              price: "4000",
              id: 2,
              type: "Desayuno",
              quantity: 1,
            },
            {
              name: "Agua 500ml",
              price: "2000",
              id: 3,
              type: "Almuerzo",
              quantity: 1,
            },
          ],
          status: "pending",
          dataEntry: "2022-6-11 13:58",
          id: 8,
        },
        {
          client: "Pepe Ramirez",
          products: [
            {
              name: "Hamburguesa",
              price: "12000",
              id: 4,
              type: "Almuerzo",
              quantity: 1,
            },
            {
              name: "Jugo Natural",
              price: "4000",
              id: 6,
              type: "Almuerzo",
              quantity: 1,
            },
          ],
          status: "pending",
          dataEntry: "2022-6-11 13:58",
          id: 9,
        },
        {
          "client": "Manuel Pérez",
          "products": [
            {
              "name": "Sandwich de jamón y queso",
              "price": "10000",
              "id": 1,
              "type": "Desayuno",
              "quantity": 1
            },
            {
              "name": "Café americano",
              "price": "4000",
              "id": 2,
              "type": "Desayuno",
              "quantity": 1
            }
          ],
          "status": "served",
          "dataEntry": "2022-6-10 20:19",
          "id": 1,
          "dateProcessed": "2022-6-10 21:33",
          "timeOrd": "01:14:00"
        },
      ],
    });
  });
};

export { products, createOrder, createProduct, updateOrder, getOrder };
