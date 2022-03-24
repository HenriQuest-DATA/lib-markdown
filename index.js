const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function tratarErro(erro){
    throw new Error(chalk.red(erro.code, 'Arquivo não encontrado!'));
}

// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.promises.readFile(caminhoDoArquivo, encoding)
//         .then(dados => console.log(chalk.green(dados)))
//         .catch(erro => console.log(erro.message));
// }

function extraiLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^&$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;

    while((temp = regex.exec(texto)) !== null){
        arrayResultados.push({ [temp[1]]: temp[2] });
    }

    //const result = regex.exec(texto);
    return arrayResultados.length === 0 ? 'Não há links' : arrayResultados;
}

async function pegaDadosTudo(caminhoDoArquivo){
    const encoding = 'utf-8';
    try{
        let response = await fs.promises.readFile(caminhoDoArquivo, encoding); //promises é como uma função assincrona. await = then
        //console.log(chalk.blueBright(response));
        return extraiLinks(response);
    } catch(e){
        tratarErro(e.message);
    }
}

// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, function(erro, dados){
//         if(erro){
//             tratarErro(erro);
//         }
//         console.log(chalk.green(dados));
//     })
// }

//pegaArquivo('./arquivos/texto1.md');
//pegaDadosTudo('./arquivos/texto1.md');

module.exports = pegaDadosTudo;