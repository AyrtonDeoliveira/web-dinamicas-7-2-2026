var inventario = [];

fetch("inventario.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    inventario = data;

    // Poblar categorías
    var opciones = "<option value='todas'>Todas las categorías</option>";
    var cats = [];
    for (var i = 0; i < inventario.length; i++) {
      var cat = inventario[i]._categoria;
      if (cats.indexOf(cat) === -1) {
        cats.push(cat);
        opciones += "<option value='" + cat + "'>" + cat + "</option>";
      }
    }
    document.getElementById("cat").innerHTML = opciones;

    renderInventario();
  });

document.getElementById("cat").addEventListener("change", renderInventario);
document.getElementById("sort").addEventListener("change", renderInventario);

function renderInventario() {
  var cat   = document.getElementById("cat").value;
  var orden = document.getElementById("sort").value;

  var data = [];
  for (var i = 0; i < inventario.length; i++) {
    if (cat === "todas" || inventario[i]._categoria === cat) {
      data.push(inventario[i]);
    }
  }

  data.sort(function(a, b) {
    if (orden === "nombre")     return a.nombre.localeCompare(b.nombre);
    if (orden === "precioAsc")  return parseFloat(a.precio) - parseFloat(b.precio);
    if (orden === "precioDesc") return parseFloat(b.precio) - parseFloat(a.precio);
    if (orden === "stockDesc")  return parseInt(b.stock) - parseInt(a.stock);
    return 0;
  });

  // Métricas
  var stockTotal  = 0;
  var valorTotal  = 0;
  var sumaPrecios = 0;
  for (var i = 0; i < data.length; i++) {
    stockTotal  += parseInt(data[i].stock);
    valorTotal  += parseFloat(data[i].precio) * parseInt(data[i].stock);
    sumaPrecios += parseFloat(data[i].precio);
  }
  document.getElementById("m-articulos").textContent = data.length;
  document.getElementById("m-stock").textContent     = stockTotal;
  document.getElementById("m-valor").textContent     = "$" + valorTotal.toFixed(2);
  document.getElementById("m-precio").textContent    = "$" + (data.length ? (sumaPrecios / data.length).toFixed(2) : "0.00");

  // Tabla
  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    tbody.innerHTML +=
      "<tr>" +
        "<td><span class='codigo'>#" + item._codigo + "</span></td>" +
        "<td>" + item.nombre + "</td>" +
        "<td><span class='cat-badge'>" + item._categoria + "</span></td>" +
        "<td>$" + parseFloat(item.precio).toFixed(2) + "</td>" +
        "<td>" + item.stock + "</td>" +
        "<td>" + item.fecha_ingreso + "</td>" +
      "</tr>";
  }
}