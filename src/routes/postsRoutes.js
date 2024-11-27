// Importa o express para criar a aplicação web
import express from "express";
import cors from "cors";
// Importa o multer para lidar com uploads de arquivos
import multer from "multer";
// Importa as funções controladoras de posts
import {
  listarPosts,
  postarNovoPost,
  uploudImagem,
  atualizarNovoPost
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "https:/localhost:8000",
  optionsSucessStatus: 200
}
// // Comentado por não estar em uso no momento
// // Configura o armazenamento de uploads (descomente para habilitar)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// Define o multer para salvar uploads na pasta "./uploads" (substitua storage para usar armazenamento customizado)
const upload = multer( {
  dest: "./uploads"
});

// Define as rotas da aplicação
const routes = (app) => {
  // Permite que o Express entenda requisições com formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))
  // Rota GET para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (ajuste o nome da rota e função de upload se necessário)
  app.post("/upload", upload.single("imagem"), uploudImagem); // Ajuste o nome da função de upload
  app.put("/uploud/:id", atualizarNovoPost)
};

export default routes;