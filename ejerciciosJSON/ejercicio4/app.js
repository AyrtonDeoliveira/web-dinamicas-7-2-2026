var empleados = [];

fetch("empleados.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    empleados = data;

    // Poblar departamentos
    var opciones = "<option value='todos'>Todos los departamentos</option>";
    var deps = [];
    for (var i = 0; i < empleados.length; i++) {
      var dep = empleados[i].departamento;
      if (deps.indexOf(dep) === -1) {
        deps.push(dep);
        opciones += "<option value='" + dep + "'>" + dep + "</option>";
      }
    }
    document.getElementById("dep").innerHTML = opciones;

    renderEmpleados();
  });

document.getElementById("dep").addEventListener("change", renderEmpleados);
document.getElementById("search").addEventListener("input", renderEmpleados);

function calcularEdad(fechaNac) {
  var hoy = new Date();
  var nac = new Date(fechaNac);
  var edad = hoy.getFullYear() - nac.getFullYear();
  var cumple = new Date(hoy.getFullYear(), nac.getMonth(), nac.getDate());
  if (hoy < cumple) edad--;
  return edad;
}

function renderEmpleados() {
  var dep      = document.getElementById("dep").value;
  var busqueda = document.getElementById("search").value.toLowerCase();
  var grid     = document.getElementById("grid");

  var data = [];
  for (var i = 0; i < empleados.length; i++) {
    var e = empleados[i];
    var nombreCompleto = (e.nombre + " " + e.apellido).toLowerCase();
    var matchDep    = dep === "todos" || e.departamento === dep;
    var matchSearch = nombreCompleto.indexOf(busqueda) !== -1;
    if (matchDep && matchSearch) {
      data.push(e);
    }
  }

  if (data.length === 0) {
    grid.innerHTML = "<p class='empty'>No se encontraron empleados.</p>";
    return;
  }

  grid.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var e = data[i];
    var iniciales = e.nombre[0].toUpperCase() + e.apellido[0].toUpperCase();
    grid.innerHTML +=
      "<div class='emp-card'>" +
        "<div class='avatar'>" + iniciales + "</div>" +
        "<div class='emp-body'>" +
          "<p class='emp-name'>" + e.nombre + " " + e.apellido + "</p>" +
          "<p class='emp-puesto'>" + e.puesto + " · " + e.departamento + "</p>" +
          "<div class='emp-tags'>" +
            "<span class='tag tag-num'>Emp. #" + e._numero + "</span>" +
            "<span class='tag'>Nacimiento: " + e.fecha_nacimiento + "</span>" +
            "<span class='tag'>" + calcularEdad(e.fecha_nacimiento) + " años</span>" +
          "</div>" +
        "</div>" +
      "</div>";
  }
}
