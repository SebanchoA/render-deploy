const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());


app.use(express.json());

// const libros = [
//   { id: 1, titulo: "1984", autor: "G.O" },
//   { id: 2, titulo: "CAS", autor: "G.G.M" },
// ];

const mongoUri = process.env.MONGODB_URI;

try {
  mongoose.connect(mongoUri);
  console.log("Estas conectado");
} catch (error) {
  console.error("error de conexion", error);
}

const libroSchema =  new mongoose.Schema({
  titulo: String,
  autor: String,
})

const Libro = mongoose.model("Libro", libroSchema);
//Rutas
app.get("/", (req, res) => {
  res.send("Bienvenidos a la app de libros");
});

app.get("/libros", async (req, res)=>{
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).send("Error", error);
  }
});
    // res.json(libros);

app.get("/libros/:id"),async (req, res)=>{
  try {
    const libro = await Libro.findById(req.params.id);
    if (libro) {
      res.json(libro);
    }else{
      res.status(404).send("libro No encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al buscar", error);
  }
}

app.post("/libros", async (req, res) => {
  const libro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor
  })
  try {
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(500).send("Error al guardar el libro", error);
  }
});
  
// const libro = {
//   titulo: req.body.titulo,
//   autor: req.body.autor,
// };
// libros.push(libro);
// res.json(libro);
// });

app.listen(3000, () => {
  console.log("servidor en http://localhost:3000");
});
