let placa = document.getElementById("placa");
let boton = document.getElementById("consultar");

let vehiculos = [
  {
    placa: "ABC123",
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020,
  },
  {
    placa: "XYZ789",
    marca: "Kia",
    modelo: "Rio",
    año: 2022,
  },
  {
    placa: "DEF456",
    marca: "Hyundai",
    modelo: "Accent",
    año: 2019,
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
      document.getElementById("resultado").innerHTML =
        "<h2>VEHÍCULO ENCONTRADO</h2>" +
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
        "</p>";
    } else {
      document.getElementById("resultado").textContent =
        "No se encontró ningún vehículo con esa placa";
    }
  }
});
