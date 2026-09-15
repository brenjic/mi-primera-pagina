const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
app.get("/", (req, res) => {
  res.send("Servidor de revisión vehicular funcionando 🚗");
});
app.get("/vehiculos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM vehiculos");
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al consultar los vehículos");
  }
});
app.post("/vehiculos", async (req, res) => {
  try {
    const {
      placa,
      propietario,
      marca,
      modelo,
      anio,
      propietarios,
      soat,
      revisionTecnica,
      papeletas,
      uso,
      combustible,
      garantias,
      medidas,
      deudaSat,
      impuestoVehicular,
      deudaSutran,
      infraccionesSutran,
      accidentes,
      lunasPolarizadas,
      seguroVehicular,
      recomendacionMecanica,
      ordenCaptura,
      deudaAtu,
      cambiosPlaca,
      conclusion,
    } = req.body;

    const resultado = await pool.query(
      `INSERT INTO vehiculos
(placa, propietario, marca, modelo, anio, propietarios, soat, revision_tecnica, papeletas, uso, combustible, garantias, medidas, deuda_sat, impuesto_vehicular, deuda_sutran, infracciones_sutran, accidentes, lunas_polarizadas, seguro_vehicular, recomendacion_mecanica, orden_captura, deuda_atu, cambios_placa, conclusion)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
RETURNING *`,
      [
        placa,
        propietario,
        marca,
        modelo,
        anio,
        propietarios,
        soat,
        revisionTecnica,
        papeletas,
        uso,
        combustible,
        garantias,
        medidas,
        deudaSat,
        impuestoVehicular,
        deudaSutran,
        infraccionesSutran,
        accidentes,
        lunasPolarizadas,
        seguroVehicular,
        recomendacionMecanica,
        ordenCaptura,
        deudaAtu,
        cambiosPlaca,
        conclusion,
      ],
    );

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el vehículo");
  }
});

app.get("/vehiculos/:placa", async (req, res) => {
  try {
    const { placa } = req.params;

    const resultado = await pool.query(
      "SELECT * FROM vehiculos WHERE placa = $1",
      [placa.toUpperCase()],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontró ningún vehículo con esa placa",
      });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al consultar el vehículo",
    });
  }
});
app.get("/vehiculos/existe/:placa", async (req, res) => {
  try {
    const { placa } = req.params;

    const resultado = await pool.query(
      "SELECT 1 FROM vehiculos WHERE placa = $1",
      [placa.toUpperCase()],
    );

    res.json(resultado.rows.length > 0);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al comprobar la placa",
    });
  }
});
app.put("/vehiculos/:placa", async (req, res) => {
  try {
    const { placa } = req.params;
    const { marca, modelo, anio } = req.body;

    const resultado = await pool.query(
      `UPDATE vehiculos
       SET placa = $1,
           marca = $2,
           modelo = $3,
           anio = $4
       WHERE placa = $5
       RETURNING *`,
      [placa.toUpperCase(), marca, modelo, anio, placa.toUpperCase()],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontró ningún vehículo con esa placa",
      });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al editar el vehículo",
    });
  }
});
app.delete("/vehiculos/:placa", async (req, res) => {
  try {
    const { placa } = req.params;

    const resultado = await pool.query(
      "DELETE FROM vehiculos WHERE placa = $1 RETURNING *",
      [placa.toUpperCase()],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontró ningún vehículo con esa placa",
      });
    }

    res.json({
      mensaje: "Vehículo eliminado correctamente",
      vehiculo: resultado.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al eliminar el vehículo",
    });
  }
});
pool.query("SELECT NOW()", (error, resultado) => {
  if (error) {
    console.error("Error al conectar con PostgreSQL:", error);
  } else {
    console.log("✅ Conectado a PostgreSQL correctamente");
    console.log("Hora de PostgreSQL:", resultado.rows[0].now);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
