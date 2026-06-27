const productos = [
    { id: 1, nombre: 'Laptop', categoria: 'Electrónica', precio: 1200, stock: 5 },
    { id: 2, nombre: 'Mouse', categoria: 'Electrónica', precio: 25, stock: 30 },
    { id: 3, nombre: 'Camisa', categoria: 'Ropa', precio: 45, stock: 10 },
    { id: 4, nombre: 'Monitor', categoria: 'Electrónica', precio: 300, stock: 0 },
    { id: 5, nombre: 'Pantalón', categoria: 'Ropa', precio: 60, stock: 8 }
  ];
  
  const resultado = document.getElementById("resultado");
  
  document.getElementById("electronicos").addEventListener("click", () => {
    const electronicos = productos.filter(producto =>
      producto.categoria == "Electrónica" && producto.precio < 500
    );
  
    resultado.innerHTML = "";
  
    electronicos.forEach(producto => {
      resultado.innerHTML += `<p>${producto.nombre} - $${producto.precio}</p>`;
    });
  });


  
  document.getElementById("desc").addEventListener("click", () => {
    const descuento = productos.map(producto => ({
      ...producto,
      precio: producto.precio * 0.9
    }));
  
    resultado.innerHTML = "";
  
    descuento.forEach(producto => {
      resultado.innerHTML += `<p>${producto.nombre} - $${producto.precio}</p>`;
    });
  });
  
  document.getElementById("buscar").addEventListener("click", () => {
    const sinStock = productos.find(producto => producto.stock === 0);
    resultado.innerHTML = `<p>${sinStock.nombre} - Precio = ${sinStock.precio} - Stock = ${sinStock.stock}</p>`
  })

  
 const form = document.getElementById("formProducto"). addEventListener("click", (e) => {
  
    const nombre = document.getElementById("nombre").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const stock = Number(document.getElementById("stock").value);
  
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      categoria,
      precio,
      stock
    };
  
    productos.push(nuevoProducto);
  
    console.log("Producto agregado:");
    console.log(nuevoProducto);
  
    console.log("Lista de productos:");
    console.table(productos);
  });
