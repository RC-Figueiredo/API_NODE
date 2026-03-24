//importação a partir de CommonJS
// var express = require("express");

import express, { response } from "express";
import { request } from "http";

const app = express();
const porta = 3000;

app.get("/", (request, response) => {
    response.send("Olá, Teste");
});

app.get("/usuario", (request, response) =>{
    response.json([
        {
        id:1,
        nome:"Renatao",
        Profissao:"desempregadu"
    },
        {
            id:2,
            nome:"joao",
            profissao:"mecanico"
        }
    ])
})

app.listen(porta, (request,response) => {
    console.log(`Servidor rodando: http://127.0.0.1:${porta}`)
});
