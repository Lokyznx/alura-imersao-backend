import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
  // Permite que o Express entenda requisições com formato JSON
  app.use(express.json());
  // Rota GET para buscar todos os posts
  app.get("/posts", listarPosts);
}

export default routes;