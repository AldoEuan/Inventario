let cash = _cajero(db_dinero)
let productos = _productos(db_producto)
let purchase = _comprar(db_comprado)
let sales = _ventas(db_venta)
const getcash = () => {
  let cashText = document.getElementById('cash')
  cashText.innerHTML = `Capital $ ${cash.getalmacenado()} MXN`
}

const buildSaleTable = () =>{
  let table = document.getElementById('salesTable')
  let lista = table.getElementsByTagName('tbody')[0]
  lista.innerHTML = ''
  sales.getventas().forEach(element => {
    let row = document.createElement('tr')
    let fecha = moment(element.fecha);
    row.innerHTML=`
    <th scope="row">${element.productoid}</th>
    <td>${fecha.format('LLLL')}</td>
    <td>${element.cantidad}</td>
    <td>${element.preciototal}</td>
    `;
    lista.appendChild(row);
  })
}
const buildPurchaseTable = () =>{
  let table = document.getElementById('purchaseTable')
  let lista = table.getElementsByTagName('tbody')[0]
  lista.innerHTML = ''
  purchase.getallcompras().forEach(element => {
    let row = document.createElement('tr')
    let fecha = moment(element.fecha);
    row.innerHTML=`
    <th scope="row">${element.productoid}</th>
    <td>${fecha.format('LLLL')}</td>
    <td>${element.cantidad}</td>
    <td>${element.precio}</td>
    <td>${element.preciototal}</td>
    `;
    lista.appendChild(row);
  })
}

const buildtable = () => {
  let table = document.getElementById('productTable')
  let lista = table.getElementsByTagName('tbody')[0]
  lista.innerHTML = ''

  productos.getallproductos().forEach((elemento) => {
    let row = document.createElement('tr')
    const sellButton = `sale-${elemento.id}`
    const purchaseButton = `purchase-${elemento.id}`
    row.innerHTML = `
    <th scope="row">${elemento.id}</th>
    <td>${elemento.nombre}</td>
    <td>${elemento.peso}</td>
    <td>${elemento.precio}</td>
    <td><button type="button" class="btn btn-primary" id="${sellButton}">Vender</button></td>
    <td><button type="button" class="btn btn-secondary" id="${purchaseButton}">Comprar</button></td>
   
    `
    lista.appendChild(row)
    document.getElementById(sellButton).addEventListener('click', (e) => {
      sellButtonevent(elemento.id)
    })
    document.getElementById(purchaseButton).addEventListener('click', (e) => {
      purchaseButtonEvent(elemento.id)
    })
  })
}

const purchaseButtonEvent = (id) => {
  let container = document.getElementById('purchaseContainer')
  let product = productos.getproducto(id)
  container.innerHTML = `
    <div class="col" >
    <h5 >${product.nombre}</h5>
    </div>
    <div class="col">
    <h6>Existencia: ${product.peso} kg</h6>
    </div>
    <div class="col">
      <label for="sellItem">Cantidad a comprar (KG)</label>
      <input type="text" class="form-control" id="purchaseItem">
      <label for="sellItem">Precio de compra (KG)</label>
      <input type="text" class="form-control" id="purchasePrice">
      <button type="button" class="btn btn-success" id="btnPurchaseItem">Comprar</button>
    </div>
    <div class="col">
      <button type="button" class="btn btn-danger" id="cancelPurchase">Cancelar</button>
    </div>
  `
  document.getElementById('btnPurchaseItem').addEventListener('click', (e) => {
    const amount = document.getElementById('purchaseItem').value
    const price = document.getElementById('purchasePrice').value
    purchaseProductAction(product, new Number(amount), new Number(price))
  })
  document.getElementById('cancelPurchase').addEventListener('click', cancelOp)
}

const purchaseProductAction = (product, amount, price) => {
  try {
    const total = price * amount
    productos.compra(product.id, amount)
    cash.compra(total)
    purchase.new(product.id, amount, price)
    console.log(price)
    console.log(amount)
    console.log(total)
  } catch (err) {
    alert(err.error)
  }
  buildtable()
  getcash()
  buildPurchaseTable()
  cancelOp()
}

const sellButtonevent = (id) => {
  let container = document.getElementById('sellContainer')
  let product = productos.getproducto(id)
  container.innerHTML = `
  <div class="col">
    <h5>${product.nombre}</h5>
  </div>
  <div class="col">
    <h6>Existencia: ${product.precio}</h6>
  </div>
  <div class="col">
  <label for="sellItem">Cantidad a vender por (KG)</label>
  <input type="text" class="form-control" id="sellItem">
  <button type="button" class="btn btn-success" id="btnSellItem">Vender</button>
  </div> 
  <div class="col">
  <button type="button" class="btn btn-danger" id="cancelSell">cancelar</button>
  </div>
`
  document.getElementById('btnSellItem').addEventListener('click', (e) => {
    const amount = document.getElementById('sellItem').value
    sellProductAction(product, new Number(amount))
  })
  document.getElementById('cancelSell').addEventListener('click', cancelOp)
}
const cancelOp = () => {
  document.getElementById('sellContainer').innerHTML = ''
  document.getElementById('purchaseContainer').innerHTML = ''
}

const sellProductAction = (product, amount) => {
  try {
    const totalsale = amount * product.precio
    productos.venta(product.id, amount)
    cash.venta(totalsale)
    sales.new(product.id, amount, product.precio)
    console.log(totalsale)
  } catch (err) {
    alert(err.error)
  }
  buildtable()
  getcash()
  buildSaleTable()
  cancelOp()
}

const newProductEvent = () => {
  const nombre = document.getElementById('np_name').value
  const cantidad = new Number(document.getElementById('np_stored').value)
  const precioventa = new Number(document.getElementById('np_p_price').value)
  const precio = new Number(document.getElementById('np_s_price').value)
  try {
    cash.compra(cantidad * precio)
    const newprod = productos.newproducto(nombre, cantidad, precioventa)
    purchase.new(newprod.id, cantidad, precio)
  } catch (err) {
    alert(err.error)
  }
  buildtable()
  getcash()
  buildPurchaseTable()
  document.getElementById('addProduct').reset()
  addProductEventEnd()
}
const sumbitEvent = (e) => {
  e.preventDefault()
  switch (e.target.id) {
    case 'addProduct':
      newProductEvent()
      break
    default:
      break
  }
}
const addProductEventStart = () => {
  document.getElementById('addProduct').style.display = 'block'
  document.getElementById('addProductBtn').style.display = 'none'
}
const addProductEventEnd = () => {
  document.getElementById('addProduct').reset()
  document.getElementById('addProduct').style.display = 'none'
  document.getElementById('addProductBtn').style.display = 'block'
}
addEventListener('load', getcash)
addEventListener('load', buildtable)
addEventListener('load',buildSaleTable)
addEventListener('load',buildPurchaseTable)
addEventListener('submit', sumbitEvent)
document
  .getElementById('addProductBtn')
  .addEventListener('click', addProductEventStart)
document
  .getElementById('cancelNewProd')
  .addEventListener('click', addProductEventEnd)
// en la lecciion vendiendo productos pat1
