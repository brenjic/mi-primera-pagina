let placa = document.getElementById("placa");
let boton = document.getElementById("consultar");

let vehiculos = [
  {
    placa: "ABC123",
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020,
    propietarios: 2,
    soat: "Vigente",
    revisionTecnica: "Vigente",
    papeletas: "Sin papeletas",
  },
  {
    placa: "XYZ789",
    marca: "Kia",
    modelo: "Rio",
    año: 2022,
    propietarios: 1,
    soat: "Vigente",
    revisionTecnica: "Vigente",
    papeletas: "2 papeletas pendientes",
  },
  {
    placa: "DEF456",
    marca: "Hyundai",
    modelo: "Accent",
    año: 2019,
    propietarios: 3,
    soat: "Vigente",
    revisionTecnica: "Vencida",
    papeletas: "Sin papeletas",
  },
];

boton.addEventListener("click", function () {
  let numeroPlaca = placa.value.toUpperCase();
  let formatoValido = /^[A-Z0-9]{6}$/.test(numeroPlaca);

  if (numeroPlaca === "") {
    document.getElementById("resultado").textContent =
      "Por favor, ingrese una placa";
  } else if (numeroPlaca.length !== 6) {
    document.getElementById("resultado").textContent =
      "La placa debe tener 6 caracteres";
  } else if (!formatoValido) {
    document.getElementById("resultado").textContent =
      "La placa debe tener 3 letras y 3 números";
  } else {
    let encontrado = vehiculos.find(function (vehiculo) {
      return vehiculo.placa === numeroPlaca;
    });

    if (encontrado) {
      let colorSoat;
      if (encontrado.soat === "Vigente") {
        colorSoat = "green";
      } else {
        colorSoat = "red";
      }
      let colorrevision;
      if (encontrado.revisionTecnica === "Vigente") {
        colorrevision = "green";
      } else {
        colorrevision = "red";
      }
      let colorPapeletas;
      if (encontrado.papeletas === "Sin papeletas") {
        colorPapeletas = "green";
      } else {
        colorPapeletas = "red";
      }

      if (
        encontrado.soat &&
        encontrado.revisionTecnica &&
        encontrado.papeletas
      ) {
      }

      document.getElementById("resultado").innerHTML =
        "<div class='ficha-vehiculo'>" +
        "<h2>🚗 INFORMACIÓN DEL VEHÍCULO</h2>" +
        "<p><strong>Placa:</strong> " +
        encontrado.placa +
        "</p>" +
        "<p><strong>Marca:</strong> " +
        encontrado.marca +
        "</p>" +
        "<p><strong>Modelo:</strong> " +
        encontrado.modelo +
        "</p>" +
        "<p><strong>Año:</strong> " +
        encontrado.año +
        "</p>" +
        "<p><strong>Propietarios:</strong> " +
        encontrado.propietarios +
        "</p>" +
        "<hr>" +
        "<h2>📄 DOCUMENTACIÓN</h2>" +
        "<p><strong>SOAT:</strong> <span style='color:" +
        colorSoat +
        "'>" +
        encontrado.soat +
        "</span></p>" +
        "<p><strong>Revisión Técnica:</strong> <span style='color:" +
        colorrevision +
        "'>" +
        encontrado.revisionTecnica +
        "</span></p>" +
        "<hr>" +
        "<h2>⚠️ MULTAS</h2>" +
        "<p><strong>Papeletas:</strong> <span style='color:" +
        colorPapeletas +
        "'>" +
        encontrado.papeletas +
        "</span></p>" +
        "</div>";
    } else {
      document.getElementById("resultado").textContent =
        "No se encontró ningún vehículo con esa placa";
    }
  }
});
