const pegaDados = require('../index');

const arrayResultado = [{
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
}];

describe('pegaArquivo:: ', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaDados).toBe('function');
    });
    it('deve retornar array com resultados', async () => {
        expect(await pegaDados('test/arquivos-test/texto1.md')).toEqual(arrayResultado);
    });
    it('deve retornar "não há links"',  async () => {
        expect(await pegaDados('test/arquivos-test/texto2.md')).toBe('Não há links');
    });
    // it('deve retornar "Arquivo não encontrado!"',  async () => {
    //     expect(await pegaDados('test/arquivos-test')).toThrow();
    // });
})

// test('deve ser uma função', () => {
//     expect(typeof pegaDados).toBe('function');
// });