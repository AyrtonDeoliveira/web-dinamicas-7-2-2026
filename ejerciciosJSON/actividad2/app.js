var productos = [];

fetch("productos.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    productos = data;
    renderProductos(productos);
  });

function renderProductos(data) {
  var grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var p = data[i];
    var disponible = p.disponible === "true";

    grid.innerHTML += `
      <div class="producto-card">
        <div class="card-top">
          <h2>${p.nombre}</h2>
          <span class="precio">$${parseFloat(p.precio).toFixed(2)}</span>
        </div>
        <div class="detalles">
          <span class="detalle-pill">Color: ${p.detalles.color}</span>
          <span class="detalle-pill">Talla: ${p.detalles.talla}</span>
        </div>
        <span class="badge ${disponible ? "badge-ok" : "badge-no"}">
          ${disponible ? "Disponible" : "Sin stock"}
        </span>
      </div>`;
  }
}

document.getElementById("filtro").addEventListener("change", function() {
  var filtro = document.getElementById("filtro").value;
  var filtrados = [];

  if (filtro === "todos") {
    filtrados = productos;
  } else {
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].disponible === filtro) {
        filtrados.push(productos[i]);
      }
    }
  }

  renderProductos(filtrados);
});
