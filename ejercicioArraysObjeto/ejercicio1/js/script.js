let empleados = [];

function calcularBruto(categoria){

    if(categoria=="A"){
        return 1840;
    }

    if(categoria=="B"){
        return 1080;
    }

    return 2000;
}

function agregarEmpleado(){

    let nombre =
    document.getElementById("nombre").value;

    let categoria =
    document.getElementById("categoria").value;

    let antiguedad =
    parseInt(document.getElementById("antiguedad").value);

    let bruto = calcularBruto(categoria);

    let jubilacion = bruto * 0.11;
    let sindicato = bruto * 0.04;
    let obraSocial = bruto * 0.03;

    let premio = 0;

    if(antiguedad > 17){
        premio = 100;
    }

    let neto =
    bruto + premio -
    jubilacion -
    sindicato -
    obraSocial;

    let empleado = {
        nombre,
        categoria,
        antiguedad,
        bruto,
        jubilacion,
        sindicato,
        obraSocial,
        premio,
        neto
    };

    empleados.push(empleado);

    alert("Empleado agregado");

    mostrarTodos();
}

function generarTabla(lista){

    let html =
    "<table>" +
    "<tr>" +
    "<th>Empleado</th>" +
    "<th>Categoria</th>" +
    "<th>Antigüedad</th>" +
    "<th>Bruto</th>" +
    "<th>Jubilación</th>" +
    "<th>Sindicato</th>" +
    "<th>Obra Social</th>" +
    "<th>Premio</th>" +
    "<th>Neto</th>" +
    "</tr>";

    for(let e of lista){

        let clase="";

        if(e.antiguedad < 15){
            clase="rojo";
        }

        if(e.antiguedad > 20){
            clase="azul";
        }

        html +=
        "<tr class='"+clase+"'>" +
        "<td>"+e.nombre+"</td>" +
        "<td>"+e.categoria+"</td>" +
        "<td>"+e.antiguedad+"</td>" +
        "<td>$"+e.bruto.toFixed(2)+"</td>" +
        "<td>$"+e.jubilacion.toFixed(2)+"</td>" +
        "<td>$"+e.sindicato.toFixed(2)+"</td>" +
        "<td>$"+e.obraSocial.toFixed(2)+"</td>" +
        "<td>$"+e.premio.toFixed(2)+"</td>" +
        "<td>$"+e.neto.toFixed(2)+"</td>" +
        "</tr>";
    }

    html += "</table>";

    document.getElementById("resultado").innerHTML =
    html;
}

function mostrarTodos(){
    generarTabla(empleados);
}

function mostrarCategoriaA(){

    let lista =
    empleados.filter(e => e.categoria=="A");

    generarTabla(lista);
}

function mostrarNetos1200(){

    let lista =
    empleados.filter(e => e.neto > 1200);

    generarTabla(lista);
}

function mostrarAntiguedad6(){

    let lista =
    empleados.filter(e => e.antiguedad > 6);

    generarTabla(lista);
}

function buscarEmpleado(){

    let nombre =
    document.getElementById("buscarNombre")
    .value
    .toLowerCase();

    let encontrado =
    empleados.find(
        e => e.nombre.toLowerCase()==nombre
    );

    if(encontrado){
        generarTabla([encontrado]);
    }
    else{
        document.getElementById("resultado")
        .innerHTML =
        "<h3>Empleado no encontrado</h3>";
    }
}

function mostrarEstadisticas(){

    let categoriaA =
    empleados.filter(e => e.categoria=="A").length;

    let categoriaB =
    empleados.filter(e => e.categoria=="B").length;

    let categoriaC =
    empleados.filter(e => e.categoria=="C").length;

    let netosC =
    empleados
    .filter(e => e.categoria=="C")
    .map(e => e.neto);

    document.getElementById("resultado")
    .innerHTML =
    "<h3>Estadísticas</h3>" +
    "Cantidad categoría A: " + categoriaA + "<br>" +
    "Cantidad categoría B: " + categoriaB + "<br>" +
    "Cantidad categoría C: " + categoriaC + "<br><br>" +
    "Netos categoría C: " +
    netosC.join(" - ");
}