import {
  getTodosPosts,
  criarPost,
  atualizarPost
} from "../models/postsModel.js";
import fs from "fs"
import gerarDescricaoComGemini from "../Services/GeminiService.js"

export async function listarPosts(req, res) {
  // Chama a função para buscar os posts do banco de dados
  const posts = await getTodosPosts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost();
    res.status(200).json(postCriado);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      "Erro": "Falha na requisição"
    })
  }
}

export async function uploudImagem(req, res) {
  const novoPost = {
    descricao: "",
    ImgUrl: req.file.originalname,
    Alt: ""
  }
  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uplouds/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada)
    res.status(200).json(postCriado);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      "Erro": "Falha na requisição"
    })
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `https://localhost:3000/${id}.png`
  try {
    const imgBuffer = readFileSync(`uplouds/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)
    const post = {
      ImgUrl: urlImagem,
      descricao: descricao,
      Alt: req.body.alt
    }
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      "Erro": "Falha na requisição"
    })
  }
}