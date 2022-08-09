const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Verifica se ao chamar saveCartItems com o argumento <ol><li>Item</li></ol> o método localStorage.setItem é chamado', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });

  it('Verifica se ao chamar saveCartItems com o argumento <ol><li>Item</li></ol> o método localStorage.setItem é chamado com dois parâmetros', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
