// Array de objetos con los autos
let autos = [
  { marca: "Chevrolet Corsa City", precio: 39.45 },
  { marca: "Citroen C4", precio: 63 },
  { marca: "Fiat Pali Weekend", precio: 54.4 },
  { marca: "Fiat Siena", precio: 37.2 },
  { marca: "Fort Explorer XLT 4x4", precio: 42.9 },
  { marca: "Fort Ranger XLT 4x4", precio: 66.6 },
  { marca: "Peugeot 306", precio: 25 },
  { marca: "Renaut Laguna", precio: 29.5 },
  { marca: "Suzuki Fun", precio: 32.59 },
  { marca: "Volswagen Gol", precio: 39.8 },
  { marca: "Volswagen Suran", precio: 13.32 }
];

// Array donde se guardan los presupuestos
let presupuestos = [];
let resultados = document.getElementById("resultados");
let form = document.getElementById("presupuesto-form");
let accionSelect = document.getElementById("accion");
let filaVehiculo = document.getElementById("fila-vehiculo");
let filaCliente = document.getElementById("fila-cliente");
let filaBuscarCliente = document.getElementById("fila-buscar-cliente");
let vehiculoSelect = document.getElementById("vehiculo");

function mostrarResultado(contenido) {
  resultados.innerHTML = '<div class="resultado">' + contenido + '</div>';
}

function mostrarParrafo(label, valor) {
  return '<p><span class="label">' + label + '</span>' + valor + '</p>';
}

function actualizarCampos() {
  let accion = accionSelect.value;
  if (accion === "agregar") {
    filaVehiculo.style.display = "grid";
    filaCliente.style.display = "grid";
    filaBuscarCliente.style.display = "none";
  } else if (accion === "buscar") {
    filaVehiculo.style.display = "none";
    filaCliente.style.display = "none";
    filaBuscarCliente.style.display = "grid";
  } else {
    filaVehiculo.style.display = "none";
    filaCliente.style.display = "none";
    filaBuscarCliente.style.display = "none";
  }
}

function agregarPresupuesto(vehiculo, cliente) {
  let auto = null;
  for (let i = 0; i < autos.length; i++) {
    if (autos[i].marca === vehiculo) {
      auto = autos[i];
      break;
    }
  }

  if (auto === null) {
    mostrarResultado('<h2 class="error">Vehículo no encontrado</h2>');
    return;
  }

  let precio = auto.precio;
  let iva = precio * 0.21;
  let precioContado = precio + iva;
  let interes = precioContado * 0.10;
  let precioConInteres = precioContado + interes;
  let cuota24 = precioConInteres / 24;
  let cuota36 = precioConInteres / 36;

  presupuestos.push({
    vehiculo: auto.marca,
    cliente: cliente,
    precio: precio,
    iva: iva,
    precioContado: precioContado,
    interes: interes,
    precioConInteres: precioConInteres,
    cuota24: cuota24,
    cuota36: cuota36
  });

  mostrarResultado(
    '<h2>Presupuesto generado</h2>' +
    mostrarParrafo('Cliente:', cliente) +
    mostrarParrafo('Vehículo:', auto.marca) +
    mostrarParrafo('Precio base:', '$ ' + precio.toFixed(2)) +
    mostrarParrafo('IVA (21%):', '$ ' + iva.toFixed(2)) +
    mostrarParrafo('Precio contado:', '$ ' + precioContado.toFixed(2)) +
    mostrarParrafo('Interés (10%):', '$ ' + interes.toFixed(2)) +
    mostrarParrafo('Precio con interés:', '$ ' + precioConInteres.toFixed(2)) +
    mostrarParrafo('24 cuotas de:', '$ ' + cuota24.toFixed(2)) +
    mostrarParrafo('36 cuotas de:', '$ ' + cuota36.toFixed(2))
  );
}

function buscarCliente(nombre) {
  let resultado = [];
  for (let i = 0; i < presupuestos.length; i++) {
    if (presupuestos[i].cliente.toLowerCase() === nombre.toLowerCase()) {
      resultado.push(presupuestos[i]);
    }
  }

  if (resultado.length === 0) {
    mostrarResultado('<h2 class="error">No se encontraron presupuestos para ' + nombre + '</h2>');
    return;
  }

  let lista = '';
  for (let j = 0; j < resultado.length; j++) {
    lista += '<li>' + resultado[j].vehiculo + '</li>';
  }

  mostrarResultado('<h2>Vehículos del cliente: ' + nombre + '</h2><ul>' + lista + '</ul>');
}

function autosCaros() {
  let lista = '';
  for (let i = 0; i < autos.length; i++) {
    if (autos[i].precio > 40) {
      lista += '<li>' + autos[i].marca + ' - $ ' + autos[i].precio.toFixed(2) + '</li>';
    }
  }

  if (lista === '') {
    mostrarResultado('<h2>No hay autos con precio mayor a 40</h2>');
    return;
  }

  mostrarResultado('<h2>Autos con precio mayor a 40</h2><ul>' + lista + '</ul>');
}

accionSelect.onchange = actualizarCampos;
form.onsubmit = function(event) {
  event.preventDefault();

  let accion = accionSelect.value;
  let vehiculo = vehiculoSelect.value;
  let cliente = document.getElementById('cliente').value;
  let clienteBuscar = document.getElementById('cliente-buscar').value;

  if (accion === 'agregar') {
    if (vehiculo === '' || cliente.trim() === '') {
      mostrarResultado('<h2 class="error">Complete los campos Vehículo y Cliente.</h2>');
      return;
    }
    agregarPresupuesto(vehiculo, cliente);
  } else if (accion === 'buscar') {
    if (clienteBuscar.trim() === '') {
      mostrarResultado('<h2 class="error">Ingrese el nombre del cliente a buscar.</h2>');
      return;
    }
    buscarCliente(clienteBuscar);
  } else if (accion === 'caros') {
    autosCaros();
  }
};

actualizarCampos();
