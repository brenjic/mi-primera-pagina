let placa = document.getElementById("placa");
let boton = document.getElementById("consultar");
let botonRegistrar = document.getElementById("registrar");
let botonEliminar = document.getElementById("eliminar");
let botonEditar = document.getElementById("editar");
let modalEditar = document.getElementById("modalEditar");
let botonGuardarEdicion = document.getElementById("guardarEdicion");
let botonCerrarEdicion = document.getElementById("cerrarEdicion");
let indiceEditar;

botonCerrarEdicion.addEventListener("click", function () {
  modalEditar.style.display = "none";
});

botonGuardarEdicion.addEventListener("click", function () {
  let nuevaPlaca = document.getElementById("editarPlaca").value;
  let nuevaMarca = document.getElementById("editarMarca").value;
  let nuevoModelo = document.getElementById("editarModelo").value;
  let nuevoAño = document.getElementById("editarAño").value;

  let placaDuplicada = vehiculos.some(function (vehiculo, indice) {
    return (
      vehiculo.placa === nuevaPlaca.toUpperCase() && indice !== indiceEditar
    );
  });

  if (placaDuplicada) {
    document.getElementById("mensajeEdicion").textContent =
      "⚠️ Esa placa ya está registrada";
    return;
  }
  vehiculos[indiceEditar].año = nuevoAño;
  vehiculos[indiceEditar].marca = nuevaMarca;
  vehiculos[indiceEditar].modelo = nuevoModelo;
  vehiculos[indiceEditar].placa = nuevaPlaca.toUpperCase();
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  document.getElementById("mensajeEdicion").textContent =
    "✅ Cambios guardados correctamente";
});

botonEditar.addEventListener("click", function () {
  let numeroPlaca = placa.value.toUpperCase();

  indiceEditar = vehiculos.findIndex(function (vehiculo) {
    return vehiculo.placa === numeroPlaca;
  });

  if (indiceEditar === -1) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ No se encontró un vehículo con esa placa";
    return;
  }

  let vehiculo = vehiculos[indiceEditar];
  document.getElementById("editarPlaca").value = vehiculo.placa;
  document.getElementById("editarMarca").value = vehiculo.marca;
  document.getElementById("editarModelo").value = vehiculo.modelo;
  document.getElementById("editarAño").value = vehiculo.año;

  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  modalEditar.style.display = "block";
});

botonEliminar.addEventListener("click", function () {
  let numeroPlaca = placa.value.toUpperCase();

  let indice = vehiculos.findIndex(function (vehiculo) {
    return vehiculo.placa === numeroPlaca;
  });

  if (indice !== -1) {
    vehiculos.splice(indice, 1);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    document.getElementById("mensajeRegistro").textContent =
      "✅ Vehículo eliminado correctamente";
  } else {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ No se encontró un vehículo con esa placa";
  }
});

botonRegistrar.addEventListener("click", function () {
  let nuevaPlaca = document.getElementById("nuevaPlaca").value;
  let nuevaMarca = document.getElementById("nuevaMarca").value;
  let nuevoModelo = document.getElementById("nuevoModelo").value;
  let nuevoAño = document.getElementById("nuevoAño").value;

  if (nuevaMarca === "") {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Falta ingresar la marca";
    return;
  }
  if (nuevoModelo === "") {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Falta ingresar el modelo";
    return;
  }
  if (nuevoAño === "") {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Falta ingresar el Año";
    return;
  }
  if (nuevoAño < 1900 || nuevoAño > 2026) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Ingrese un año válido";
    return;
  }
  if (nuevaPlaca === "") {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Falta ingresar la Placa";
    return;
  }

  if (
    nuevaPlaca === "" ||
    nuevaMarca === "" ||
    nuevoModelo === "" ||
    nuevoAño === ""
  ) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Complete todos los campos";
    return;
  }

  let placaExiste = vehiculos.some(function (vehiculo) {
    return vehiculo.placa === nuevaPlaca.toUpperCase();
  });

  if (placaExiste) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Esta placa ya está registrada";
    return;
  }

  let nuevoVehiculo = {
    placa: nuevaPlaca.toUpperCase(),
    marca: nuevaMarca,
    modelo: nuevoModelo,
    año: nuevoAño,
    propietarios: 1,
    soat: "Vigente",
    revisionTecnica: "Vigente",
    papeletas: "Sin papeletas",
  };
  vehiculos.push(nuevoVehiculo);
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  document.getElementById("mensajeRegistro").textContent =
    "✅ Vehículo registrado correctamente";
  document.getElementById("nuevaPlaca").value = "";
  document.getElementById("nuevaMarca").value = "";
  document.getElementById("nuevoModelo").value = "";
  document.getElementById("nuevoAño").value = "";
});

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
let vehiculoGuardado = localStorage.getItem("vehiculos");
console.log(vehiculoGuardado);
console.log(JSON.parse(vehiculoGuardado));
if (vehiculoGuardado) {
  vehiculos = JSON.parse(vehiculoGuardado);
}

function buscarVehiculo(numeroPlaca) {
  let encontrado = vehiculos.find(function (vehiculo) {
    return vehiculo.placa === numeroPlaca;
  });

  return encontrado;
}
function verificarEstado(vehiculo) {
  if (
    vehiculo.soat === "Vigente" &&
    vehiculo.revisionTecnica === "Vigente" &&
    vehiculo.papeletas === "Sin papeletas"
  ) {
    return "🟢 Vehículo apto para circular";
  } else {
    return "🔴 Vehículo no apto para circular";
  }
}
function obtenerColor(estado) {
  if (estado === "Vigente" || estado === "Sin papeletas") {
    return "green";
  } else {
    return "red";
  }
}

function validarPlaca(numeroPlaca) {
  if (numeroPlaca === "") {
    return "Por favor, ingrese una placa";
  } else if (numeroPlaca.length !== 6) {
    return "La placa debe tener 6 caracteres";
  } else if (!/^[A-Z]{3}[0-9]{3}$/.test(numeroPlaca)) {
    return "La placa debe tener 3 letras y 3 números";
  }

  return "ok";
}

function mostrarVehiculo(encontrado) {
  let colorSoat = obtenerColor(encontrado.soat);
  let colorrevision = obtenerColor(encontrado.revisionTecnica);
  let colorPapeletas = obtenerColor(encontrado.papeletas);
  let estado = verificarEstado(encontrado);

  document.getElementById("resultado").innerHTML = `
  <div class="ficha-vehiculo">
    <h2>🚗 INFORMACIÓN DEL VEHÍCULO</h2>

    <p><strong>Placa:</strong> ${encontrado.placa}</p>
    <p><strong>Marca:</strong> ${encontrado.marca}</p>
    <p><strong>Modelo:</strong> ${encontrado.modelo}</p>
    <p><strong>Año:</strong> ${encontrado.año}</p>
    <p><strong>Propietarios:</strong> ${encontrado.propietarios}</p>

    <hr>

    <h2>📄 DOCUMENTACIÓN</h2>

    <p><strong>SOAT:</strong>
      <span style="color:${colorSoat}">${encontrado.soat}</span>
    </p>

    <p><strong>Revisión Técnica:</strong>
      <span style="color:${colorrevision}">${encontrado.revisionTecnica}</span>
    </p>

    <hr>

    <h2>⚠️ MULTAS</h2>

    <p><strong>Papeletas:</strong>
      <span style="color:${colorPapeletas}">${encontrado.papeletas}</span>
    </p>

    <hr>

    <h2>📋 ESTADO GENERAL</h2>

    <p><strong>Estado:</strong> ${estado}</p>
  </div>
`;
}
boton.addEventListener("click", function () {
  let numeroPlaca = placa.value.toUpperCase();
  let validacion = validarPlaca(numeroPlaca);

  if (validacion !== "ok") {
    document.getElementById("resultado").textContent = validacion;
  } else {
    let encontrado = buscarVehiculo(numeroPlaca);
    if (encontrado) {
      mostrarVehiculo(encontrado);
    } else {
      document.getElementById("resultado").textContent =
        "No se encontró ningún vehículo con esa placa";
    }
  }
});
function saludar() {
  console.log("Hola Benjamín");
}
saludar();
