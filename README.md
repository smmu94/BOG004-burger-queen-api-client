# Burger Queen API Client

![Logo de Burger Queen](src/assets/png/LogoSample4.png)

## Project Description

Burger Queen is a web application designed to streamline the order-taking process in a burger restaurant. The application enables waiters to efficiently record customer orders, send them to the kitchen, and manage the entire workflow through to delivery. The application is designed for use on tablets and is also accessible on desktop and mobile devices.

## Project Objectives

* Build a web interface using React.
* Familiarize oneself with the concept of screen state and how changes in state are reflected in the interface.
* Implement an application that allows waiters to take orders, send them to the kitchen, and manage the restaurant's workflow.

## User Stories

* **HU1: System Login:** Waiters can log in to the order system with their credentials.
* **HU2: Order Taking:** Waiters can record customer orders, including product selection, quantities, and customer details.
* **HU3: Kitchen Order Management:** Kitchen staff can view orders in the order they are received and mark orders as ready to serve.
* **HU4: Ready Order Display:** Waiters can view the orders that are ready to be delivered quickly to the customers who made them.
* **HU5: User Management:** Administrators can manage the platform's users to keep their workers' information up to date.
* **HU6: Product Management:** Administrators can manage the menu to keep the products updated.

## Technologies Used

* React
* CSS Modules
* JavaScript (ES6+)
* npm
* Unit Testing (Jest)
* REST API Integration

## Screenshots

### Devices

#### Desktop

* Login:  
![Login](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747597167/Captura_de_pantalla_2025-05-18_213433_ssw7he.png)
![Login validations](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747597355/Captura_de_pantalla_2025-05-18_214131_vsa14g.png)
![Login In](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747597451/Captura_de_pantalla_2025-05-18_214340_nzky7j.png)
![Login In Error Server](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747597572/Captura_de_pantalla_2025-05-18_214534_wvufg1.png)

* Waiter:
![Waiter take orders](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598003/Captura_de_pantalla_2025-05-18_215242_ixtk20.png)
![Waiter take orders tab](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747597692/Captura_de_pantalla_2025-05-18_214742_ylneln.png)
![Waiter take orders summary](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747597820/Captura_de_pantalla_2025-05-18_214952_pjerqu.png)
![Waiter take orders summary send](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747597911/Captura_de_pantalla_2025-05-18_215113_w0wibr.png)
![Waiter ready orders](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598079/Captura_de_pantalla_2025-05-18_215409_upcuc2.png)


* Kitchen:  
![kitchen](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603560/Captura_de_pantalla_2025-05-18_221216_aucdgl.png)

* Administrator:  
![users](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603568/Captura_de_pantalla_2025-05-18_222347_nyrghe.png)
![products](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603570/Captura_de_pantalla_2025-05-18_222430_hzfvl4.png)
![delete](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603571/Captura_de_pantalla_2025-05-18_222504_jzrxtd.png)


#### Tablet

* Login:
![Login](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598925/Captura_de_pantalla_2025-05-18_220646_yrkpt0.png)

* Waiter:
![take orders](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598926/Captura_de_pantalla_2025-05-18_220755_j0zcjj.png)
![ready orders](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598926/Captura_de_pantalla_2025-05-18_220812_z9nzj8.png)

* Kitchen:  
![kitchen](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603561/Captura_de_pantalla_2025-05-18_221347_fvzbrk.png)
* Administrator: 
![users](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603567/Captura_de_pantalla_2025-05-18_222218_leyybp.png)
![products](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603566/Captura_de_pantalla_2025-05-18_222138_po6pwq.png)

#### Mobile

* Login:  
![Login](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598490/Captura_de_pantalla_2025-05-18_220018_jhkd8p.png)

* Waiter: 
![take orders](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598495/Captura_de_pantalla_2025-05-18_215648_foby46.png)
![take orders summary](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598488/Captura_de_pantalla_2025-05-18_215812_oyqxgj.png)
![nabvar](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598488/Captura_de_pantalla_2025-05-18_215829_ojpfbk.png)
![ready orders](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598488/Captura_de_pantalla_2025-05-18_215901_ywj1ue.png)
![ready orders served](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747598489/Captura_de_pantalla_2025-05-18_215933_xfetim.png)

* Kitchen: 
![kitchen](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603562/Captura_de_pantalla_2025-05-18_221414_y0my8k.png)

* Administrator: 

![users](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603563/Captura_de_pantalla_2025-05-18_221650_qi63va.png)
![nabvar](https://res.cloudinary.com/dnd96wqtb/image/upload/v1747603565/Captura_de_pantalla_2025-05-18_221752_jljgav.png)

## Test Users

### Administrator

* Email: anita.borg@systers.xyz
* Password: 123456

### Waiter

* Email: waiter@foodelicious.com
* Password: 123456

### Chef

* Email: chef@foodelicious.com
* Password: 123456
