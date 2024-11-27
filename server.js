import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
import routes from "./src/routes/postsRoutes.js";
// Cria uma instância do Express, que será nosso servidor web
const app = express();
app.use(express.static("uplouds"))
routes(app)
// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
  console.log('Servidor escutando...');
})