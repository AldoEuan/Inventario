const _cajero = (start) => {
  let dinero = start;
  return {
    venta: (total) => {
      dinero += total
    },
    compra: (total) => {
      if (total < dinero) {
        dinero -= total
      } else {
        throw { error: 'Fondos Insuficientes' }
      }
    },
    getalmacenado: () => {
      return dinero
    },
  }
}

const _productos = (start) => {
  let productos = start
  return {
    venta: (id, monto) => {
      const index = productos.findIndex((item) => item.id === id)
      if (index > -1) {
        if (productos[index].peso >= monto) {
          productos[index].peso -= monto
        } else {
          throw { error: 'poca existencia' }
        }
      } else {
        throw { error: 'producto no encontrado' }
      }
    },
    compra: (id, monto) => {
      const index = productos.findIndex((item) => item.id === id)
      if (index > -1) {
        productos[index].peso += monto
      } else {
        throw { error: 'producto no encontrado' }
      }
    },
    getallproductos:() =>{
      return productos;
    },
    getproducto: (id)=>{
      const index = productos.findIndex((item) => item.id === id)
       return productos[index];
    },
    newproducto: (nombre,peso,precio) =>{
      const lastproducto = productos[productos.length -1];
      const nuevoproducto ={id:lastproducto.id +1 , nombre: nombre, peso:peso, precio: precio};
      productos.push(nuevoproducto);
      return nuevoproducto;
    }
  }
}

const _ventas = (start) =>{
  let ventas = start;
  return{
    new: (id ,cantidad,precio)  =>{
      ventas.push({
        productoid: id , fecha : new Date(), cantidad: cantidad , preciototal:cantidad*precio,
      });
    },
    getventas:()=>{
      return ventas;
    }

    };
  };


  const _comprar = (start) =>{
    let compras = start;
    return{
      new: (id ,cantidad,precio)  =>{
        compras.push({
          productoid: id , fecha : new Date(), cantidad: cantidad , preciototal:cantidad*precio,precio:precio
        });
      },
      getallcompras:()=>{
        return compras;
      }
  
      };
    };
