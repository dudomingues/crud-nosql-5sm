const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const API = "https://technoworks.com.br";
const RA = "123456";

// =====================
// LISTAR
// =====================

app.get("/api/clientes", async (req, res) => {

    try {

        const response = await axios.get(
            `${API}/easy/get/${RA}`
        );

        res.json(response.data.dados);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao listar"
        });
    }
});


// =====================
// CRIAR
// =====================

app.post("/api/clientes", async (req, res) => {

    try {

        const { nome, endereco, telefone } = req.body;

        const response = await axios.get(
            `${API}/easy/post/${RA}?nome=${encodeURIComponent(nome)}&endereco=${encodeURIComponent(endereco)}&telefone=${encodeURIComponent(telefone)}`
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao criar"
        });
    }
});


// =====================
// EDITAR
// =====================

app.put("/api/clientes/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const { nome, endereco, telefone } = req.body;

        const response = await axios.get(
            `${API}/easy/patch/${RA}/${id}?nome=${encodeURIComponent(nome)}&endereco=${encodeURIComponent(endereco)}&telefone=${encodeURIComponent(telefone)}`
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao editar"
        });
    }
});


// =====================
// EXCLUIR
// =====================

app.delete("/api/clientes/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const response = await axios.get(
            `${API}/easy/delete/${RA}/${id}`
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao excluir"
        });
    }
});


app.listen(3000, () => {
    console.log("Servidor rodando");
});