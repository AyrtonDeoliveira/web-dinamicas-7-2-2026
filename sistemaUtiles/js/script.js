// ========================
// MODALES
// ========================

function abrirModal(tipo) {

    const modal = document.getElementById("modal");
    const contenido = document.getElementById("contenidoModal");

    if (tipo === "cliente") {
        contenido.innerHTML = `
            <h2>Nuevo Cliente</h2>

            <div class="formulario">
                <input id="codCliente" placeholder="Código">
                <input id="nomCliente" placeholder="Nombre" oninput="this.value = this.value.replace(/[0-9]/g, '')">
                <input id="apeCliente" placeholder="Apellido">
                <input id="dirCliente" placeholder="Dirección">
                <input id="razonCliente" placeholder="Razón Social">
                <input id="rucCliente" placeholder="RUC">

                <button onclick="agregarCliente()">Agregar Cliente</button>
            </div>
        `;
    }

    if (tipo === "categoria") {
        contenido.innerHTML = `
            <h2>Nueva Categoría</h2>

            <div class="formulario">
                <input id="codCategoria" placeholder="Código">
                <input id="nomCategoria" placeholder="Nombre">

                <button onclick="agregarCategoria()">Agregar Categoría</button>
            </div>
        `;
    }

    if (tipo === "producto") {
        contenido.innerHTML = `
            <h2>Nuevo Producto</h2>

            <div class="formulario">
                <input id="codProducto" placeholder="Código">
                <input id="descProducto" placeholder="Descripción">
                <input id="precioProducto" placeholder="Precio">
                <input id="stockMax" placeholder="Stock Máximo">
                <input id="stockMin" placeholder="Stock Mínimo">
                <input id="catProducto" placeholder="Categoría">

                <button onclick="agregarProducto()">Agregar Producto</button>
            </div>
        `;
    }

    if (tipo === "boleta") {
        contenido.innerHTML = `
            <h2>Nueva Boleta</h2>

            <div class="formulario">
                <input id="numBoleta" placeholder="Número">
                <input id="fechaBoleta" type="date">
                <input id="totalBoleta" placeholder="Total">
                <input id="codEmpleado" placeholder="Empleado">
                <input id="codClienteBoleta" placeholder="Cliente">

                <button onclick="agregarBoleta()">Agregar Boleta</button>
            </div>
        `;
    }

    if (tipo === "detalle") {
        contenido.innerHTML = `
            <h2>Nuevo Detalle de Boleta</h2>

            <div class="formulario">
                <input id="detalleBoleta" placeholder="Número Boleta">
                <input id="detalleProducto" placeholder="Código Producto">
                <input id="detalleCantidad" placeholder="Cantidad">

                <button onclick="agregarDetalle()">Agregar Detalle</button>
            </div>
        `;
    }

    modal.style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("modal");

    if (event.target === modal) {
        cerrarModal();
    }
};

// ========================
// DATOS
// ========================

let datos = {
    clientes: [],
    categorias: [],
    productos: [],
    boletas: [],
    detallesBoletas: []
};

// ========================
// CARGAR JSON
// ========================

async function cargarDatos() {
    try {
        const respuesta = await fetch("/json/datos.json");
        datos = await respuesta.json();

        console.log("Datos cargados correctamente");
    } catch (error) {
        console.error("Error al cargar datos.json", error);
    }
}

cargarDatos();

// ========================
// CLIENTES
// ========================

function mostrarClientes() {

    let html = `
    <h2>Clientes</h2>
    <table>
        <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Razón Social</th>
            <th>RUC</th>
        </tr>`;

    datos.clientes.forEach(c => {
        html += `
        <tr>
            <td>${c.codigo}</td>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>${c.direccion}</td>
            <td>${c.razonSocial}</td>
            <td>${c.ruc}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("resultado").innerHTML = html;
}

// ========================
// CATEGORIAS
// ========================

function mostrarCategorias() {

    let html = `
    <h2>Categorías</h2>
    <table>
        <tr>
            <th>Código</th>
            <th>Nombre</th>
        </tr>`;

    datos.categorias.forEach(c => {
        html += `
        <tr>
            <td>${c.codigo}</td>
            <td>${c.nombre}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("resultado").innerHTML = html;
}

// ========================
// PRODUCTOS
// ========================

function mostrarProductos() {

    let html = `
    <h2>Productos</h2>
    <table>
        <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock Máximo</th>
            <th>Stock Mínimo</th>
            <th>Categoría</th>
        </tr>`;

    datos.productos.forEach(p => {
        html += `
        <tr>
            <td>${p.codigo}</td>
            <td>${p.descripcion}</td>
            <td>$${p.precio}</td>
            <td>${p.stockMaximo}</td>
            <td>${p.stockMinimo}</td>
            <td>${p.categoria}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("resultado").innerHTML = html;
}

// ========================
// BOLETAS
// ========================

function mostrarBoletas() {

    let html = `
    <h2>Boletas</h2>
    <table>
        <tr>
            <th>Número</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Código Empleado</th>
            <th>Código Cliente</th>
        </tr>`;

    datos.boletas.forEach(b => {
        html += `
        <tr>
            <td>${b.numero}</td>
            <td>${b.fecha}</td>
            <td>$${b.total}</td>
            <td>${b.codigoEmpleado}</td>
            <td>${b.codigoCliente}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("resultado").innerHTML = html;
}

// ========================
// DETALLES
// ========================

function mostrarDetalles() {

    let html = `
    <h2>Detalles de Boleta</h2>
    <table>
        <tr>
            <th>Número Boleta</th>
            <th>Código Producto</th>
            <th>Cantidad</th>
        </tr>`;

    datos.detallesBoletas.forEach(d => {
        html += `
        <tr>
            <td>${d.numeroBoleta}</td>
            <td>${d.codigoProducto}</td>
            <td>${d.cantidad}</td>
        </tr>`;
    });

    html += "</table>";

    document.getElementById("resultado").innerHTML = html;
}

// ========================
// MOSTRAR TODO
// ========================

function mostrarTodo() {

    let html = "";

    // CLIENTES
    html += `
    <h2>Clientes</h2>
    <table>
        <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Razón Social</th>
            <th>RUC</th>
        </tr>`;

    datos.clientes.forEach(c => {
        html += `
        <tr>
            <td>${c.codigo}</td>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>${c.direccion}</td>
            <td>${c.razonSocial}</td>
            <td>${c.ruc}</td>
        </tr>`;
    });

    html += `</table><br>`;


    // CATEGORÍAS
    html += `
    <h2>Categorías</h2>
    <table>
        <tr>
            <th>Código</th>
            <th>Nombre</th>
        </tr>`;

    datos.categorias.forEach(c => {
        html += `
        <tr>
            <td>${c.codigo}</td>
            <td>${c.nombre}</td>
        </tr>`;
    });

    html += `</table><br>`;


    // PRODUCTOS
    html += `
    <h2>Productos</h2>
    <table>
        <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock Máximo</th>
            <th>Stock Mínimo</th>
            <th>Categoría</th>
        </tr>`;

    datos.productos.forEach(p => {
        html += `
        <tr>
            <td>${p.codigo}</td>
            <td>${p.descripcion}</td>
            <td>$${p.precio}</td>
            <td>${p.stockMaximo}</td>
            <td>${p.stockMinimo}</td>
            <td>${p.categoria}</td>
        </tr>`;
    });

    html += `</table><br>`;


    // BOLETAS
    html += `
    <h2>Boletas</h2>
    <table>
        <tr>
            <th>Número</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Empleado</th>
            <th>Cliente</th>
        </tr>`;

    datos.boletas.forEach(b => {
        html += `
        <tr>
            <td>${b.numero}</td>
            <td>${b.fecha}</td>
            <td>$${b.total}</td>
            <td>${b.codigoEmpleado}</td>
            <td>${b.codigoCliente}</td>
        </tr>`;
    });

    html += `</table><br>`;


    // DETALLES
    html += `
    <h2>Detalles de Boleta</h2>
    <table>
        <tr>
            <th>Número Boleta</th>
            <th>Código Producto</th>
            <th>Cantidad</th>
        </tr>`;

    datos.detallesBoletas.forEach(d => {
        html += `
        <tr>
            <td>${d.numeroBoleta}</td>
            <td>${d.codigoProducto}</td>
            <td>${d.cantidad}</td>
        </tr>`;
    });

    html += `</table>`;

    document.getElementById("resultado").innerHTML = html;
}

// ========================
// AGREGAR
// ========================

function agregarCliente() {

    const nombreCliente = nomCliente.value.trim();

    if (/\d/.test(nombreCliente)) {
        alert("El nombre no puede contener números.");
        return;
    }

    datos.clientes.push({
        codigo: codCliente.value,
        nombre: nombreCliente,
        apellido: apeCliente.value,
        direccion: dirCliente.value,
        razonSocial: razonCliente.value,
        ruc: rucCliente.value
    });

    cerrarModal();
    mostrarClientes();
}

function agregarCategoria() {

    datos.categorias.push({
        codigo: codCategoria.value,
        nombre: nomCategoria.value
    });

    cerrarModal();
    mostrarCategorias();
}

function agregarProducto() {

    datos.productos.push({
        codigo: codProducto.value,
        descripcion: descProducto.value,
        precio: precioProducto.value,
        stockMaximo: stockMax.value,
        stockMinimo: stockMin.value,
        categoria: catProducto.value
    });

    cerrarModal();
    mostrarProductos();
}

function agregarBoleta() {

    datos.boletas.push({
        numero: numBoleta.value,
        fecha: fechaBoleta.value,
        total: totalBoleta.value,
        codigoEmpleado: codEmpleado.value,
        codigoCliente: codClienteBoleta.value
    });

    cerrarModal();
    mostrarBoletas();
}

function agregarDetalle() {

    datos.detallesBoletas.push({
        numeroBoleta: detalleBoleta.value,
        codigoProducto: detalleProducto.value,
        cantidad: detalleCantidad.value
    });

    cerrarModal();
    mostrarDetalles();
}