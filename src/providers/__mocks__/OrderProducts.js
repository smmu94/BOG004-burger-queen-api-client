

const products = () => {
 return new Promise((resolve) => {
    resolve({data:[
        {
          "id": 1,
          "name": "Sandwich de jamón y queso",
          "price": 1000,
          "image": "http://localhost:3000/image-data/Sandwich.png",
          "type": "Desayuno",
          "dateEntry": "2022-03-05 15:14:10"
        },
        {
          "id": 2,
          "name": "Café americano",
          "price": 500,
          "image": "http://localhost:3000/image-data/cafe.png",
          "type": "Desayuno",
          "dateEntry": "2022-03-05 15:14:10"
        },
        {
          "id": 3,
          "name": "Agua 500ml",
          "price": 500,
          "image": "http://localhost:3000/image-data/agua.png",
          "type": "Almuerzo",
          "dateEntry": "2022-03-05 15:14:10"
        }
      ]})
 })}
    
 export {products} ;
   