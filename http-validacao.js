const https = require('https');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function manejaErros(erro){
    throw new Error(erro.message);
}

async function checaStatusLinks(arrayLinks){
    try{
        const arrayStatus = await Promise.all(arrayLinks.map(async url => {
            const res = await fetch(url);
            return `${res.status} - ${res.statusText}`;
        }))
        return arrayStatus;
    } catch(erro){
        manejaErros(erro);
    }
}

function geraArrayDeURLs(arrayGeral){
    const arrayURLs = arrayGeral.map(item => Object.values(item).join());
    //return arrayURLs;
    return arrayURLs;
}

async function validacaoURLs(arrayLinks){
    try{
        const arrayDeLinks = geraArrayDeURLs(arrayLinks);
        const statusLinks = await checaStatusLinks(arrayDeLinks);
        //return statusLinks;

        const resultadoFinal = arrayLinks
            .map((objeto, indice) => ({ 
                ...objeto, 
                status: statusLinks[indice] 
            }));
        return resultadoFinal;
    } catch(erro){
        manejaErros(erro);
    }
}

module.exports = validacaoURLs;