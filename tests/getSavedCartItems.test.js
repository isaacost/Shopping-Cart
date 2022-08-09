const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se ao chamar getSabedCartItems o método localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });

  it('Verifica se ao chamar getSabedCartItems o método localStorage.getItem é chamado com cartItems como parâmetro', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
