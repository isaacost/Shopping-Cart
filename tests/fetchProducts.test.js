require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifique se fetchProducts é uma função.', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifique se a função fetch foi chamada.', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });

  it('Verifique se a função fetch foi chamada com o endpoint correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  });

  it('Verifique se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('Verifique se ao chamar a função fetchProducts sem argumento retorna um erro', async () => {
    try {
      expect.assertions(1);
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
