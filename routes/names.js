const express = require("express");
const router = express.Router();

let nomes = [];

// GET
router.get("/", (req, res) => {
  res.json({ nomes });
});

// POST
router.post("/", (req, res) => {
  const { nome, imagens } = req.body;

  if (!nome || !imagens || !Array.isArray(imagens)) {
    return res
      .status(400)
      .json({ mensagem: "Nome e lista de imagens são obrigatórios" });
  }

  const novoNome = {
    id: nomes.length + 1,
    nome,
    imagens: [],
  };

  const nomeExistente = nomes.find((n) => n.nome === nome);

  if (nomeExistente) {
    novoNome.imagens = [...nomeExistente.imagens, ...imagens];

    const nomeIndex = nomes.indexOf(nomeExistente);
    nomes.splice(nomeIndex, 1, novoNome);
  } else {
    novoNome.imagens = imagens;
    nomes.push(novoNome);
  }

  res.status(201).json({ nome: novoNome });
});

// PUT
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nomeIndex = nomes.findIndex((n) => n.id === id);

  if (nomeIndex === -1) {
    return res.status(404).json({ mensagem: "Nome não encontrado" });
  }

  const { nome, imagens } = req.body;

  if (!nome || !imagens || !Array.isArray(imagens)) {
    return res
      .status(400)
      .json({ mensagem: "Nome e lista de imagens são obrigatórios" });
  }

  const nomeAtualizado = nomes[nomeIndex];
  nomeAtualizado.nome = nome;
  nomeAtualizado.imagens = imagens;

  nomes.splice(nomeIndex, 1, nomeAtualizado);

  res.json({ nome: nomeAtualizado });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nomeIndex = nomes.findIndex((n) => n.id === id);

  if (nomeIndex === -1) {
    return res.status(404).json({ mensagem: "Nome não encontrado" });
  }

  const nomeExcluido = nomes.splice(nomeIndex, 1)[0];
  res.json({ nome: nomeExcluido });
});

module.exports = router;
