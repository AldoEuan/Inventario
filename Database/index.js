const db_dinero=10000;

const db_producto = [
  // stored se sustituro por peso
  {id:1 , nombre: "Manzana", peso:1500, precio: 15},
  {id:2, nombre: "pera", peso:1300, precio: 13},
  {id:3 , nombre: "sandia", peso:2500, precio: 18}
]

const db_venta = [
  {productoid: 1 , fecha : new Date(2022,07,22), cantidad: 100 , preciototal: 1500}
]
const db_comprado = [
  { productoid: 2 , fecha: new Date(2020,04,10),cantidad:50 , precio:7.50, preciototal: 375}
]

