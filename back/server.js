const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
const testRoute = require('./routes/testRoute');
app.use('/api/test', testRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
})

app.get("/", (req, res) => {
  res.send("API de Bons-AI Agent funcionando 🚀");
});
