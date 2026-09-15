const API_URL = "https://revision-vehicular-e2gh.onrender.com";

let placa = document.getElementById("placa");
let boton = document.getElementById("consultar");
let botonRegistrar = document.getElementById("registrar");
let botonEliminar = document.getElementById("eliminar");
let botonEditar = document.getElementById("editar");
let modalEditar = document.getElementById("modalEditar");
let botonGuardarEdicion = document.getElementById("guardarEdicion");
let botonCerrarEdicion = document.getElementById("cerrarEdicion");

botonCerrarEdicion.addEventListener("click", function () {
  modalEditar.style.display = "none";
});

botonGuardarEdicion.addEventListener("click", async function () {
  let nuevaPlaca = document.getElementById("editarPlaca").value.toUpperCase();
  let nuevaMarca = document.getElementById("editarMarca").value;
  let nuevoModelo = document.getElementById("editarModelo").value;
  let nuevoAño = document.getElementById("editarAño").value;

  if (nuevaMarca === "") {
    document.getElementById("mensajeEdicion").textContent =
      "⚠️ Falta ingresar la marca";
    return;
  }

  if (nuevoModelo === "") {
    document.getElementById("mensajeEdicion").textContent =
      "⚠️ Falta ingresar el modelo";
    return;
  }

  if (nuevoAño === "") {
    document.getElementById("mensajeEdicion").textContent =
      "⚠️ Falta ingresar el año";
    return;
  }

  if (nuevoAño < 1900 || nuevoAño > 2026) {
    document.getElementById("mensajeEdicion").textContent =
      "⚠️ Ingrese un año válido";
    return;
  }

  try {
    let placaOriginal = document.getElementById("editarPlaca").dataset.original;

    console.log("Placa original:", placaOriginal);

    console.log("Datos a enviar:", {
      placa: nuevaPlaca,
      marca: nuevaMarca,
      modelo: nuevoModelo,
      anio: nuevoAño,
    });

    let respuesta = await fetch(`${API_URL}/vehiculos/${placaOriginal}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placa: nuevaPlaca,
        marca: nuevaMarca,
        modelo: nuevoModelo,
        anio: nuevoAño,
      }),
    });

    if (!respuesta.ok) {
      document.getElementById("mensajeEdicion").textContent =
        "⚠️ No se pudo editar el vehículo";
      return;
    }

    let vehiculoActualizado = await respuesta.json();

    document.getElementById("mensajeEdicion").textContent =
      "✅ Cambios guardados correctamente";

    modalEditar.style.display = "none";

    console.log("Vehículo actualizado:", vehiculoActualizado);
  } catch (error) {
    console.error(error);
    document.getElementById("mensajeEdicion").textContent =
      "⚠️ Error al conectar con el servidor";
  }
});

botonEditar.addEventListener("click", async function () {
  let numeroPlaca = placa.value.toUpperCase();

  if (numeroPlaca === "") {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Ingrese una placa";
    return;
  }

  try {
    let respuesta = await fetch(`${API_URL}/vehiculos/${numeroPlaca}`);

    if (!respuesta.ok) {
      document.getElementById("mensajeRegistro").textContent =
        "⚠️ No se encontró ningún vehículo con esa placa";
      return;
    }

    let vehiculo = await respuesta.json();

    document.getElementById("editarPlaca").value = vehiculo.placa;
    document.getElementById("editarPlaca").dataset.original = vehiculo.placa;
    document.getElementById("editarMarca").value = vehiculo.marca;
    document.getElementById("editarModelo").value = vehiculo.modelo;
    document.getElementById("editarAño").value = vehiculo.anio;

    modalEditar.style.display = "block";
  } catch (error) {
    console.error(error);
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Error al conectar con el servidor";
  }
});

botonEliminar.addEventListener("click", async function () {
  let numeroPlaca = placa.value.toUpperCase();

  if (numeroPlaca === "") {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Ingrese una placa";
    return;
  }

  try {
    let respuesta = await fetch(`${API_URL}/vehiculos/${numeroPlaca}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      document.getElementById("mensajeRegistro").textContent =
        "⚠️ No se encontró ningún vehículo con esa placa";
      return;
    }

    let resultado = await respuesta.json();

    document.getElementById("mensajeRegistro").textContent =
      "✅ Vehículo eliminado correctamente";

    console.log("Vehículo eliminado:", resultado);
  } catch (error) {
    console.error(error);
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Error al conectar con el servidor";
  }
});

botonRegistrar.addEventListener("click", async function () {
  let nuevaPlaca = document.getElementById("nuevaPlaca").value;
  let nuevoPropietario = document.getElementById("nuevoPropietario").value;
  let nuevaMarca = document.getElementById("nuevaMarca").value;
  let nuevoModelo = document.getElementById("nuevoModelo").value;
  let nuevoAño = document.getElementById("nuevoAño").value;
  let nuevoUso = document.getElementById("nuevoUso").value;
  let nuevoCombustible = document.getElementById("nuevoCombustible").value;
  let nuevaGarantia = document.getElementById("nuevaGarantia").value;
  let nuevaMedida = document.getElementById("nuevaMedida").value;

  let nuevaDeudaSat = "Sin deuda";
  let nuevoImpuestoVehicular = "Pagado";
  let nuevaDeudaSutran = "Sin deuda";
  let nuevasInfraccionesSutran = "Sin infracciones";
  let nuevosAccidentes = "Sin accidentes registrados";
  let nuevasLunasPolarizadas = "No";
  let nuevoSeguroVehicular = "No registrado";
  let nuevaRecomendacionMecanica = "Revisión recomendada";
  let nuevaOrdenCaptura = "Sin orden de captura";
  let nuevaDeudaAtu = "Sin deuda";
  let nuevosCambiosPlaca = "Sin cambios registrados";
  let nuevaConclusion = "Pendiente de evaluación";

  console.log({
    placa: nuevaPlaca,
    propietario: nuevoPropietario,
    marca: nuevaMarca,
    modelo: nuevoModelo,
    anio: nuevoAño,
  });

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

  if (!/^[A-Za-z]{3}[0-9]{3}$/.test(nuevaPlaca)) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ La placa debe tener 3 letras y 3 números";
    return;
  }

  if (
    nuevaPlaca === "" ||
    nuevoPropietario === "" ||
    nuevaMarca === "" ||
    nuevoModelo === "" ||
    nuevoAño === ""
  ) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Complete todos los campos";
    return;
  }

  let respuestaExiste = await fetch(
    `${API_URL}/vehiculos/existe/${nuevaPlaca.toUpperCase()}`,
  );

  let existe = await respuestaExiste.json();

  if (existe) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Esta placa ya está registrada";
    return;
  }

  let nuevoVehiculo = {
    placa: nuevaPlaca.toUpperCase(),
    propietario: nuevoPropietario,
    marca: nuevaMarca,
    modelo: nuevoModelo,
    anio: nuevoAño,
    uso: nuevoUso,
    combustible: nuevoCombustible,
    garantias: nuevaGarantia,
    medidas: nuevaMedida,
    deudaSat: nuevaDeudaSat,
    impuestoVehicular: nuevoImpuestoVehicular,
    deudaSutran: nuevaDeudaSutran,
    infraccionesSutran: nuevasInfraccionesSutran,
    accidentes: nuevosAccidentes,
    lunasPolarizadas: nuevasLunasPolarizadas,
    seguroVehicular: nuevoSeguroVehicular,
    recomendacionMecanica: nuevaRecomendacionMecanica,
    ordenCaptura: nuevaOrdenCaptura,
    deudaAtu: nuevaDeudaAtu,
    cambiosPlaca: nuevosCambiosPlaca,
    conclusion: nuevaConclusion,
    propietarios: 1,
    soat: "Vigente",
    revisionTecnica: "Vigente",
    papeletas: "Sin papeletas",
  };

  let respuesta = await fetch(`${API_URL}/vehiculos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoVehiculo),
  });

  if (!respuesta.ok) {
    document.getElementById("mensajeRegistro").textContent =
      "⚠️ Error al registrar el vehículo";
    return;
  }

  document.getElementById("mensajeRegistro").textContent =
    "✅ Vehículo registrado correctamente";

  document.getElementById("nuevaPlaca").value = "";
  document.getElementById("nuevoPropietario").value = "";
  document.getElementById("nuevaMarca").value = "";
  document.getElementById("nuevoModelo").value = "";
  document.getElementById("nuevoAño").value = "";
  document.getElementById("nuevoUso").value = "";
  document.getElementById("nuevoCombustible").value = "";
  document.getElementById("nuevaGarantia").value = "";
  document.getElementById("nuevaMedida").value = "";
});

function verificarEstado(vehiculo) {
  if (
    vehiculo.soat === "Vigente" &&
    vehiculo.revision_tecnica === "Vigente" &&
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

function obtenerColorSunarp(estado) {
  if (estado === "Sin garantías" || estado === "Sin medidas") {
    return "green";
  } else {
    return "red";
  }
}

function obtenerColorSat(estado) {
  if (estado === "Sin deuda" || estado === "Pagado") {
    return "green";
  } else {
    return "red";
  }
}

function obtenerColorSutran(estado) {
  if (estado === "Sin deuda" || estado === "Sin infracciones") {
    return "green";
  } else {
    return "red";
  }
}

function obtenerColorAtu(estado) {
  if (estado === "Sin deuda") {
    return "green";
  } else {
    return "red";
  }
}

function obtenerColorOrdenCaptura(estado) {
  if (estado === "Sin orden de captura") {
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
  let colorrevision = obtenerColor(encontrado.revision_tecnica);
  let colorPapeletas = obtenerColor(encontrado.papeletas);
  let estado = verificarEstado(encontrado);

  let colorGarantias = obtenerColorSunarp(encontrado.garantias);
  let colorMedidas = obtenerColorSunarp(encontrado.medidas);

  let colorDeudaSat = obtenerColorSat(encontrado.deuda_sat);
  let colorImpuesto = obtenerColorSat(encontrado.impuesto_vehicular);

  let colorDeudaSutran = obtenerColorSutran(encontrado.deuda_sutran);

  let colorInfraccionesSutran = obtenerColorSutran(
    encontrado.infracciones_sutran,
  );

  let colorDeudaAtu = obtenerColorAtu(encontrado.deuda_atu);

  let colorOrdenCaptura = obtenerColorOrdenCaptura(encontrado.orden_captura);

  document.getElementById("resultado").innerHTML = `
    <div class="ficha-vehiculo">

      <!-- INFORMACIÓN PRINCIPAL -->
      <div class="informacion-principal">
        <h2>🚗 INFORMACIÓN DEL VEHÍCULO</h2>

        <div class="datos-principales">
          <p><strong>Placa:</strong> ${encontrado.placa}</p>
          <p><strong>Marca:</strong> ${encontrado.marca}</p>
          <p><strong>Modelo:</strong> ${encontrado.modelo}</p>
          <p><strong>Propietario:</strong> ${encontrado.propietario}</p>
          <p><strong>Año:</strong> ${encontrado.anio}</p>
        </div>
      </div>

      <!-- CARACTERÍSTICAS -->
      <div class="caracteristicas-vehiculo tarjeta-ancha">
        <h3>🚘 CARACTERÍSTICAS</h3>

        <div class="datos-tarjeta">
          <p><strong>Uso:</strong> ${encontrado.uso}</p>
          <p><strong>Combustible:</strong> ${encontrado.combustible}</p>
          <p><strong>Propietarios:</strong> ${encontrado.propietarios}</p>
        </div>
      </div>

      <!-- GRID DEL INFORME -->
      <div class="grid-informe">

        <!-- SUNARP -->
        <div class="caracteristicas-vehiculo">
          <h3>🏛️ SUNARP</h3>

          <p>
            <strong>Garantías:</strong>
            <span style="color:${colorGarantias}">
              ${encontrado.garantias}
            </span>
          </p>

          <p>
            <strong>Medidas / Embargos:</strong>
            <span style="color:${colorMedidas}">
              ${encontrado.medidas}
            </span>
          </p>
        </div>

        <!-- SAT -->
        <div class="caracteristicas-vehiculo">
          <h3>🏛️ SAT</h3>

          <p>
            <strong>Deuda SAT:</strong>
            <span style="color:${colorDeudaSat}">
              ${encontrado.deuda_sat}
            </span>
          </p>

          <p>
            <strong>Impuesto vehicular:</strong>
            <span style="color:${colorImpuesto}">
              ${encontrado.impuesto_vehicular}
            </span>
          </p>
        </div>

        <!-- SUTRAN -->
        <div class="caracteristicas-vehiculo">
          <h3>🚨 SUTRAN</h3>

          <p>
            <strong>Deuda:</strong>
            <span style="color:${colorDeudaSutran}">
              ${encontrado.deuda_sutran}
            </span>
          </p>

          <p>
            <strong>Infracciones:</strong>
            <span style="color:${colorInfraccionesSutran}">
              ${encontrado.infracciones_sutran}
            </span>
          </p>
        </div>

        <!-- ATU -->
        <div class="caracteristicas-vehiculo">
          <h3>🚌 ATU</h3>

          <p>
            <strong>Deuda:</strong>
            <span style="color:${colorDeudaAtu}">
              ${encontrado.deuda_atu}
            </span>
          </p>
        </div>

        <!-- ANTECEDENTES -->
        <div class="caracteristicas-vehiculo">
          <h3>🚗 ANTECEDENTES</h3>

          <p>
            <strong>Accidentes / Siniestros:</strong>
            ${encontrado.accidentes}
          </p>

          <p>
            <strong>Lunas polarizadas:</strong>
            ${encontrado.lunas_polarizadas}
          </p>

          <p>
            <strong>Cambios de placa:</strong>
            ${encontrado.cambios_placa}
          </p>
        </div>

        <!-- DOCUMENTACIÓN -->
        <div class="caracteristicas-vehiculo">
          <h3>📄 DOCUMENTACIÓN</h3>

          <p>
            <strong>SOAT:</strong>
            <span style="color:${colorSoat}">
              ${encontrado.soat}
            </span>
          </p>

          <p>
            <strong>Revisión Técnica:</strong>
            <span style="color:${colorrevision}">
              ${encontrado.revision_tecnica}
            </span>
          </p>

          <p>
            <strong>Papeletas:</strong>
            <span style="color:${colorPapeletas}">
              ${encontrado.papeletas}
            </span>
          </p>
        </div>

        <!-- SEGURO -->
        <div class="caracteristicas-vehiculo">
          <h3>🛡️ SEGURO VEHICULAR</h3>

          <p>
            <strong>Seguro:</strong>
            ${encontrado.seguro_vehicular}
          </p>
        </div>

        <!-- SEGURIDAD -->
        <div class="caracteristicas-vehiculo">
          <h3>🚨 SEGURIDAD</h3>

          <p>
            <strong>Orden de captura:</strong>
            <span style="color:${colorOrdenCaptura}">
              ${encontrado.orden_captura}
            </span>
          </p>
        </div>

        <!-- RECOMENDACIÓN -->
        <div class="caracteristicas-vehiculo">
          <h3>🔧 RECOMENDACIÓN</h3>

          <p>
            <strong>Revisión mecánica:</strong>
            ${encontrado.recomendacion_mecanica}
          </p>
        </div>

      </div>

      <!-- CONCLUSIÓN -->
      <div class="caracteristicas-vehiculo tarjeta-conclusion">
        <h3>📋 CONCLUSIÓN</h3>

        <p>
          <strong>Resultado:</strong>
          ${encontrado.conclusion}
        </p>
      </div>

      <!-- ESTADO GENERAL -->
      <div class="estado-general">
        ${estado}
      </div>

    </div>
  `;
}

boton.addEventListener("click", async function () {
  let numeroPlaca = placa.value.toUpperCase();
  let validacion = validarPlaca(numeroPlaca);

  if (validacion !== "ok") {
    document.getElementById("resultado").textContent = validacion;
    return;
  }

  try {
    let respuesta = await fetch(`${API_URL}/vehiculos/${numeroPlaca}`);

    if (!respuesta.ok) {
      document.getElementById("resultado").textContent =
        "No se encontró ningún vehículo con esa placa";
      return;
    }

    let encontrado = await respuesta.json();

    mostrarVehiculo(encontrado);
  } catch (error) {
    console.error(error);
    document.getElementById("resultado").textContent =
      "Error al conectar con el servidor";
  }
});

function saludar() {
  console.log("Hola Benjamín");
}

saludar();
