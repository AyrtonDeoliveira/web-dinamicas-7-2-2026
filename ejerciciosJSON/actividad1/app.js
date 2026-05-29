fetch("personas.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(personas) {

    // Métricas
    var total = personas.length;
    var sumaEdades = 0;
    var minEdad = personas[0].age;
    var maxEdad = personas[0].age;

    for (var i = 0; i < personas.length; i++) {
      sumaEdades += personas[i].age;
      if (personas[i].age < minEdad) minEdad = personas[i].age;
      if (personas[i].age > maxEdad) maxEdad = personas[i].age;
    }

    document.getElementById("m-total").textContent = total;
    document.getElementById("m-avg").textContent   = Math.round(sumaEdades / total);
    document.getElementById("m-min").textContent   = minEdad;
    document.getElementById("m-max").textContent   = maxEdad;

    // Tabla
    var tbody = document.getElementById("tbody");

    for (var i = 0; i < personas.length; i++) {
      tbody.innerHTML += "<tr><td>" + personas[i].name + "</td><td>" + personas[i].age + "</td></tr>";
    }

  });
