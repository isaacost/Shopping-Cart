require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifique se fetchItem é uma função.', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  
  it('Verifique se a função fetch foi chamada.', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('Verifique se a função fetch foi chamada com o endpoint correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });

  it('Verifique se o retorno da função fetchItem com o argumento MLB1615760527 é uma estrutura de dados igual ao objeto item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Verifique se ao chamar a função fetchItem sem argumento retorna um erro', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
