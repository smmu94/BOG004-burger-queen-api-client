export const products = {
  data: [
    {
      id: 1,
      name: "Ham and cheese sandwich",
      price: 1000,
      image: "http://localhost:3000/image-data/Sandwich.png",
      type: "Desayuno",
      dateEntry: "2022-03-05 15:14:10",
    },
    {
      id: 2,
      name: "Americano coffee",
      price: 500,
      image: "http://localhost:3000/image-data/cafe.png",
      type: "Desayuno",
      dateEntry: "2022-03-05 15:14:10",
    },
    {
      id: 3,
      name: "Water 500ml",
      price: 500,
      image: "http://localhost:3000/image-data/agua.png",
      type: "Almuerzo",
      dateEntry: "2022-03-05 15:14:10",
    },
  ],
};

export const createOrder = {
  data: [
    {
      client: "Pepe Gonzalez",
      products: [
        {
          name: "Americano coffee",
          price: 500,
          id: 2,
          type: "Desayuno",
          quantity: 1,
        },
      ],
      status: "pending",
      dateEntry: "2022-06-06 11:01",
      id: 5,
    },
  ],
};

export const createProduct = {
  data: [
    {
      id: 1,
      name: "Ham and cheese sandwich",
      price: "15000",
      image: "http://localhost:3000/image-data/Sandwich.png",
      type: "Desayuno",
      dateEntry: "2022-03-05 15:14:10",
    },
  ],
};

export const updateOrder = {
  data: {
    userId: 3,
    client: "Pepe Gonzalez",
    products: [
      {
        name: "Ham and cheese sandwich",
        price: 1000,
        id: 1,
        type: "Desayuno",
        quantity: 2,
      },
      {
        name: "Americano coffee",
        price: 500,
        id: 2,
        type: "Desayuno",
        quantity: 2,
      },
    ],
    status: "delivered",
    dateEntry: "2022-06-06 11:01",
    id: 5,
    dateProcessed: "2022-06-06 15:28",
    timeOrd: "04:27:00",
  },
};

export const getOrder = {
  data: [
    {
      client: "Juana Cruz",
      products: [
        {
          name: "Ham and cheese sandwich",
          price: "10000",
          id: 1,
          type: "Desayuno",
          quantity: 1,
        },
        {
          name: "Water 500ml",
          price: "2000",
          id: 3,
          type: "Almuerzo",
          quantity: 1,
        },
      ],
      status: "delivered",
      dateEntry: "2022-06-11 11:39",
      id: 7,
      dateProcessed: "2022-06-11 12:53",
      timeOrd: "01:14:00",
    },
    {
      client: "Juan Rodriguez",
      products: [
        {
          name: "Ham and cheese sandwich",
          price: "10000",
          id: 1,
          type: "Desayuno",
          quantity: 1,
        },
        {
          name: "Americano coffee",
          price: "4000",
          id: 2,
          type: "Desayuno",
          quantity: 1,
        },
        {
          name: "Water 500ml",
          price: "2000",
          id: 3,
          type: "Almuerzo",
          quantity: 1,
        },
      ],
      status: "pending",
      dateEntry: "2022-06-11 13:58",
      id: 8,
    },
    {
      client: "Pepe Ramirez",
      products: [
        {
          name: "Burger",
          price: "12000",
          id: 4,
          type: "Almuerzo",
          quantity: 1,
        },
        {
          name: "Natural juice",
          price: "4000",
          id: 6,
          type: "Almuerzo",
          quantity: 1,
        },
      ],
      status: "pending",
      dateEntry: "2022-06-11 13:58",
      id: 9,
    },
    {
      client: "Manuel Pérez",
      products: [
        {
          name: "Ham and cheese sandwich",
          price: "10000",
          id: 1,
          type: "Desayuno",
          quantity: 1,
        },
        {
          name: "Americano coffee",
          price: "4000",
          id: 2,
          type: "Desayuno",
          quantity: 1,
        },
      ],
      status: "pending",
      dateEntry: "2022-06-11 14:12",
      id: 10,
    },
  ],
};

