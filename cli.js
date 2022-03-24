#!/usr/bin/env node

const pegaDados = require('./index');
//const caminho = process.argv;
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const validacaoURLs = require('./http-validacao');

async function processaTexto(caminhoDeArquivo){
    const resultado = await pegaDados(caminhoDeArquivo);
    return resultado;
}

async function pegarArquivos(caminho) {

    const caminhoAbsoluto = path.join(__dirname, caminho);
    const encoding = 'utf-8';
    const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
    const todosResultados = [];

    for(let x= 0; x < arquivos.length; x++){
        todosResultados.push(await processaTexto(`${caminhoAbsoluto}\\${arquivos[x]}`));
    }
    const final = [].concat.apply([], todosResultados);

    if(process.argv[3] === 'validar'){
        console.log(await validacaoURLs(final));
    } else{
        return final;
    }
}

pegarArquivos(process.argv[2]);


